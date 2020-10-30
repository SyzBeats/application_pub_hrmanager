/**
 * @description create the functions to manipulate the user via lowdb
 * @version 1.0
 */

const createUserModel = (db) => {
  return {
    /**
     * @description receive single user by email
     * @param {string} email
     */
    getUser(email) {
      console.log(email);
      let users = db.get("user").value();
      let user = users.find((user) => user.email === email);
      return user;
    },

    /**
     * @description: receive user information and hash and signup the user (store in DB).
     * if the user already exists, throw an error
     * @param {string} email
     * @param {string} hash
     * @return User
     */
    signup(email, hash) {
      const newUser = {
        email,
        hash,
      };
      let users = db.get("user").value();
      let found = users.find((user) => user.email === email);

      if (found) throw new Error("Could not sign up");
      db.get("user").push(newUser).write();

      return newUser;
    },
  };
};

module.exports = createUserModel;
