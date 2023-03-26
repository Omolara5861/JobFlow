const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  //Set Default Error Message
  let customError = {
    msg: err.message || 'Something went wrong pls try again',
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  }

  if(err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map(validation => validation.message).join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if(err.name === 'CastError') {
    customError.msg = `ID: ${err.value} is not a correct syntax`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if(err.code && err.code === 11000) {
    let field = Object.keys(err.keyValue);
    customError.msg = `A unique value for ${field} field is required, an ${field} with the address provided already exist, pls provide another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware
