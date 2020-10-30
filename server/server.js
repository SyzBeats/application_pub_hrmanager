const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { models, db } = require("./db");

/**
 * @description Server object
 * The request object passed to the context function
 * enables the jwt based authentication as the resolvers have access to the req context
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    return { models, db, req };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
