const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Pls provide your name'],
        minLength: [3, 'Name should be longer than 3 characters'],
        maxLength: [50, 'Name is too long, should not be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Pls enter your email address'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Pls enter a valid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Pls provide a password'],
        minlength: 8
    }
});

UserSchema.pre('save', function() {
    const salt = bcrypt.genSalt(11);
    this.password = bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function() {
    return jwt.sign({id: this._id, name: this.name}, 'randomsecret', {expiresIn: '30d'})
}


module.exports = model('User', UserSchema);