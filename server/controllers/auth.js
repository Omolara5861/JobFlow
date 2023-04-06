/** Import required packages and modules */
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

/** Function for registering users */
const register = async (req, res) => {
    //Create user object from request body
    const user = await User.create({ ...req.body });
    //Create JWT token for new user
    const token = user.createJWT();
    // Send 201 HTTP status with user's name and token
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

/** This function handles the login functionality */
const login = async (req, res) => {
    //Extract email and password from request body
    const { email, password } = req.body;
    //Checks if email and password are submitted, throw bad request error if not
    if (!email || !password)
        throw new BadRequestError("Pls provide your email and password");
    //Look up user in the database by email
    const user = await User.findOne({ email });
    //If user doesn't exist, throw unauthenticated error
    if (!user) throw new UnauthenticatedError("Invalid Email Credential");
    //Checks if submitted password matches the password in database, throw unauthenticated error if not
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect)
        throw new UnauthenticatedError("Invalid Password Credential");
    //Create JWT token for user
    const token = user.createJWT();
    // Send 200 HTTP Status with user's name and token
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

//Export register and login functions
module.exports = {
    register,
    login,
};
