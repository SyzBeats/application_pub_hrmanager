import { InMemoryCache, makeVar } from "@apollo/client";

/**
 * @description create the initial reactive variables to access
 * them via Apollo cache
 */
export const currentEmployeeVar = makeVar();
export const editModalOpenVar = makeVar(false);
export const createModalOpenVar = makeVar(false);

/**
 * @description define field policies to enable the read functionality of reactive variables
 */
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // current selected employee
        currentEmployee: {
          read() {
            return currentEmployeeVar();
          },
        },
        // edit modal for employees
        modalOpen: {
          read() {
            return editModalOpenVar();
          },
        },
        // create modal for new employees
        createModalOpen: {
          read() {
            return createModalOpenVar();
          },
        },
      },
    },
  },
});
