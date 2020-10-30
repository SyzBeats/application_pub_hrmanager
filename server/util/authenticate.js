const jwt = require("jsonwebtoken");
const SECRET = "notverysecure";

/**
 * @description to protect certain routes there is an authentication against
 * an existing user. If the decoded token is verified the token is returned
 * @param {Request} req
 * @param {boolean} requireAuth
 */
const authenticate = (req, requireAuth = true) => {
  const authHeader = req.headers.authorization;

  /**
   * The token will be transmitted as <Bearer> token, so the "Bearer" is stripped off
   * to gain the actual token value and verify it
   */
  if (authHeader) {
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  }

  /**
   * if no header is in the request object and authentication is required
   * an Error is thrown that indicates the reason.
   */
  if (requireAuth) {
    throw new Error("Login in to access resource");
  }
  return null;
};
module.exports = { authenticate };
