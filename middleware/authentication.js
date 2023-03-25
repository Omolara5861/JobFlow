// const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');


const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith('Bearer ')) throw new UnauthenticatedError('Invalid authentication');
    const token = authHeaders.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userID: payload.id, name: payload.name}
        // const user = await User.findById(payload.id).select('-password');
        // req.user = user;
        next();
    } catch (error) {
        throw new UnauthenticatedError(`Invalid authentication`)
    }
}

module.exports = auth;