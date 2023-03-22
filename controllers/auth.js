const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const register = async (req, res) => {
    const user = await User.create(...req.body);
    res.status(StatusCodes.CREATED).json({msg: 'User Registered', user});
}

const login = async (req, res) => {
    res.status(200).send('User Logged In')
}

module.exports = {
    register,
    login
}