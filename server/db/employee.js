const { UserInputError } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");

/**
 * @description create all methods to manipulate the "employees" via lowDB
 * @version 1.0
 */
const createEmployeeModel = (db) => {
  return {
    /**
     * @description receive all stored employees in lowdb
     * @return {Array} employees
     */
    getAllItems() {
      return db.get("employee").value();
    },

    /**
     * @description: pass an identifier to receive the matching object.
     * Find instead of filter is used as we just expect one value
     * @param {number} _id
     * @return matching employee
     */
    getOneItem(_id) {
      let employees = db.get("employee").value();
      let filtered = employees.find((employee) => employee._id === _id);

      if (filtered.length < 1) {
        throw new UserInputError("This user does not exist", {
          invalid: _id,
        });
      }
      return filtered;
    },

    /**
     * @description inserting new Employee. ID will be generated
     *
     * @param {object} {employee}
     * @return new Employee object
     */
    addItem({ firstName, lastName, position, gender, dob, department }) {
      const newEmployee = {
        _id: uuidv4(),
        firstName,
        lastName,
        position,
        gender,
        department,
        dob: new Date(dob),
      };

      db.get("employee").push(newEmployee).write();
      return newEmployee;
    },

    /**
     * @description deletes the matched employee by _id
     * @param {object} args employee _id
     * @return {Array} filtered employees
     */
    deleteItem({ _id }) {
      const employees = db.get("employee").value();
      const filtered = employees.filter((employee) => employee._id !== _id);
      return filtered;
    },

    /**
     * @description receives information and edits the matching employee, if found
     * @param {object} args - the Employee input
     * @return {object} edited employee object
     */
    editItem({ _id, firstName, lastName, position, gender, department }) {
      const employees = db.get("employee").value();
      const toManipulate = employees.find((employee) => employee._id === _id);

      // in case the employee does not exist, throw an error
      if (!toManipulate) {
        throw new UserInputError("Employee was not found", {
          invalid: _id,
        });
      }

      // check if exists before altering and avoid null insertion
      if (firstName) toManipulate.firstName = firstName;
      if (lastName) toManipulate.lastName = lastName;
      if (position) toManipulate.position = position;
      if (department) toManipulate.department = department;
      if (gender) toManipulate.gender = gender;

      // find the right match and update
      let altered = employees.map((employee) => (employee._id === _id ? toManipulate : employee));
      db.get("employee", [...altered]).write();
      return toManipulate;
    },
  };
};

module.exports = createEmployeeModel;
