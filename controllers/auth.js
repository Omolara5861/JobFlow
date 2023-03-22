const User = require('../models/user');
const {StatusCodes} = require('http-status-codes');
const bcrypt = require('bcryptjs');
const register = async (req, res) => {
    const {name, email, password} = req.body;


    const salt = await bcrypt.genSalt(11);
    const hashedPassword = bcrypt.hash(password, salt);

    const tempUser = {name, email, password: hashedPassword}
    const user = await User.create({...tempUser});
    res.status(StatusCodes.CREATED).json({msg: 'User Registered', user});
}

const login = async (req, res) => {
    res.status(200).send('User Logged In')
}

module.exports = {
    register,
    login
}