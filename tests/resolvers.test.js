const resolvers = require("../server/resolvers");
const { models, db } = require("../server/db");
/**
 * testing the signup endpoint to fail on certain
 * conditions
 */
describe("signup user", () => {
  it("fails if parameters are wrong", async () => {
    const result = resolvers.Mutation.signupUser(
      null,
      {
        data: {
          email: "simeon@web.de",
          falsePassword: "123456",
        },
      },
      { models, db },
      null
    );
    await expect(result).rejects.toThrowError();
  });
  it("fails if parameters are empty", async () => {
    const result = resolvers.Mutation.signupUser(
      null,
      {
        data: {
          email: "",
          falsePassword: "",
        },
      },
      { models, db },
      null
    );
    await expect(result).rejects.toThrowError();
  });
});
