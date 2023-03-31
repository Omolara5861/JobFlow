// const User = require('../models/user');
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

/** A middleware function that receives @param request, @param response and @param next function as arguments */
const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization;
    // It checks if the request headers contain a valid "Bearer" token, throws an error if it's not valid or not present.
    if (!authHeaders || !authHeaders.startsWith("Bearer "))
        throw new UnauthenticatedError("Invalid authentication");
    //Decodes the token using the 'JWT_SECRET' environment variable and sets a 'userID' and 'name' property in the 'req.user' object.
    const token = authHeaders.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userID: payload.userID, name: payload.name };
        // const user = await User.findById(payload.id).select('-password');
        // req.user = user;
        //Calls 'next' function to pass the control to the next middleware or endpoint
        next();
    } catch (error) {
        throw new UnauthenticatedError(`Invalid authentication`);
    }
};

module.exports = auth;
