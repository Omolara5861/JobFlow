const { StatusCodes } = require("http-status-codes");
/**
 * @summary This middleware function handles errors and sends a JSON response with a custom message and status code
 * @param {object} err - the error object
 * @param {object} req - the request object
 * @param {object} res- the response object
 * @param {function} next - the next function
 * @returns custom error depending on what went wrong
 */
const errorHandlerMiddleware = (err, req, res, next) => {
  /** Set Default Error Message and Status Code
   * @property msg - the default message
   * @property statusCode - the default status code
   */
  let customError = {
    msg: err.message || "Something went wrong pls try again",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  /** Set Error Message for Validation Errors */
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((validation) => validation.message)
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  /** Sets Error Message for Invalid ID Errors */
  if (err.name === "CastError") {
    customError.msg = `ID: ${err.value} is not a correct syntax`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  /** Set Error Message for Duplicate key Errors */
  if (err.code && err.code === 11000) {
    let field = Object.keys(err.keyValue);
    customError.msg = `A unique value for ${field} field is required, an ${field} with the address provided already exist, pls provide another value`;
    customError.statusCode = StatusCodes.CONFLICT;
  }

  /** Send the JSON response with the custom error message and status code */
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

/** Exports the middleware function */
module.exports = errorHandlerMiddleware;
