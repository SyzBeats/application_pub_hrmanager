/**
 * @description GraphQL resolvers
 * resolvers in this file are connected to the types defined
 * in schema.js. What is returned by a resolver function will then be returned in the Query
 * @version 1.0
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const SECRET = "notverysecure";
const { authenticate } = require("./util/authenticate");

module.exports = {
  Query: {
    /**
     * @description get all employees stored in the Db as array
     * @return {Array} employees
     */
    employees(parent, args, { models, req }, info) {
      const token = authenticate(req);

      let exists = models.User.getUser(token.user);
      if (!exists) throw new Error("could not authenticate");

      return models.Employee.getAllItems();
    },

    /**
     * @description get a single employee based on the _id
     * @return Employee
     */
    employee(parent, args, { models, req }, info) {
      const token = authenticate(req);
      let exists = models.User.getUser(token.user);
      if (!exists) throw new Error("could not authenticate");
      return models.Employee.getOneItem(args._id) || [];
    },
  },
  Mutation: {
    /**
     * @description add an employee based on the given information
     * @return Employee
     */
    addEmployee(parent, args, { models, req }, info) {
      const token = authenticate(req);
      let exists = models.User.getUser(token.user);
      if (!exists) throw new Error("could not authenticate");
      return models.Employee.addItem(args);
    },

    /**
     * @description
     * @return {object} deleted employee
     */
    deleteEmployee(parent, args, { models, db, req }, info) {
      const token = authenticate(req);
      const filtered = models.Employee.deleteItem(args);
      db.set("employee", [...filtered]).write();
      return filtered;
    },

    /**
     * @description edit existing employee based on given information
     * @return {object} edited Employee
     */
    editEmployee(parent, args, { models, req }) {
      const token = authenticate(req);
      let exists = models.User.getUser(token.user);
      if (!exists) throw new Error("could not authenticate");

      return models.Employee.editItem(args);
    },

    /**
     * @description login route to authenticate and existing user
     * and return the token
     * @return {object} token
     */
    loginUser: async (parent, args, { models }, info) => {
      const {
        data: { email, password },
      } = args;

      const user = models.User.getUser(email);
      if (!user) throw new Error("Unable to Login");

      // the hashed PW of the user that was stored in DB
      const { hash } = user;

      // check if hash and password match
      const match = await bcrypt.compare(password, hash);

      if (!match) throw new Error("Unable to Login");

      return { token: jwt.sign({ user: email }, SECRET, { expiresIn: "10h" }) };
    },

    /**
     * @description user signup mechanism
     * bcrypt is used as it remains to be unbroken yet and as it has inbuilt salting.
     * Alternatives woulde be the algorithms Argon2 or Scrypt, while Argon2 would be preferrable
     * due to configurable memory and GPU hardness
     * @return {object} token
     */
    signupUser: async (parent, args, { models }, info) => {
      const {
        data: { email, password },
      } = args;

      // hash to prevent storage in plain text
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);

      // store the user in the lowDB and receive it back in the token
      const newUser = models.User.signup(email, hash);
      return { token: jwt.sign({ user: newUser.email }, SECRET, { expiresIn: "10h" }) };
    },
  },

  /**
   * as the Date Scalar does not exist in Graqphl
   * the ScalarType Date is created which parses
   * incoming numeric Date representations to Dates
   * and serializes outgoing data back into timestamps
   */
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value).getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value);
      }
      return null;
    },
  }),
};
