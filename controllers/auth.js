const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const BadRequestError = require('../errors');
const UnauthenticatedError = require('../errors')

const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token});
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) throw new BadRequestError('Pls provide your email and password');
    const user = await User.findOne({email});
    if(!user) throw new UnauthenticatedError('Invalid Email Credential');
    const isPasswordCorrect = User.comparePassword(password);
    if(!isPasswordCorrect) throw new UnauthenticatedError('Invalid Password Credential');
    const token = User.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token});
}

module.exports = {
    register,
    login
}