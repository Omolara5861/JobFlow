const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');

const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token});
}

const login = async (req, res) => {
    res.status(200).send('User Logged In')
}

module.exports = {
    register,
    login
}