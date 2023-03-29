/** Necessary module imports */
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** Define a new schema for user */
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

/**
 * Use bcryptjs to hash the password before saving it to the database */
UserSchema.pre('save', async function () {
    //Generates salt
    const salt = await bcrypt.genSalt(11);
    //Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
});

/** Add method that creates JWT token on the @user schema
 * @return Create JWT token with the user ID and user name, expires after a certain time
 */
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userID: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFESPAN })
}

/**
 * Compare the user entered password with hashed password in the database
 * @param {string} userPassword - The user entered password
 * @returns true if the user's password match with the hashed password ,else false
 */
UserSchema.methods.comparePassword = async function (userPassword) {
    const isAMatch = await bcrypt.compare(userPassword, this.password);
    return isAMatch;
}

/** Export the model with user Schema */
module.exports = model('User', UserSchema);