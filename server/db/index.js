const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

/**
 * @description initialize basic LowDB functionality
 * and create the used models to interact within the graphql resolvers
 */
const adapter = new FileSync("./server/db/db.json");
const db = low(adapter);
const createEmployeeModel = require("./employee");
const createUserModel = require("./user");

module.exports = {
  models: {
    Employee: createEmployeeModel(db),
    User: createUserModel(db),
  },
  db,
};
