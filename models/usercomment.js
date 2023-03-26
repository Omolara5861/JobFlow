```
// Importing necessary modules
const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Pls provide your name'], // name is required field
        minLength: [3, 'Name should be longer than 3 characters'], // minimum length of name should be 3 characters
        maxLength: [50, 'Name is too long, should not be more than 50 characters'] // maximum length of name should not exceed 50 characters
    },
    email: {
        type: String,
        required: [true, 'Pls enter your email address'], // email address is required field
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Pls enter a valid email address'], // email address should be in valid format
        unique: true, // email address should be unique
    },
    password: {
        type: String,
        required: [true, 'Pls provide a password'], // password is required field
        minlength: 8 // minimum length of the password should be 8 characters
    }
});

// Using bcryptjs to hash the password before saving it to the database
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(11); // generating salt
    this.password = await bcrypt.hash(this.password, salt); // hashing the password using the generated salt
});

// Creating JWT token
UserSchema.methods.createJWT = function() {
    return jwt.sign({userID: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFESPAN}); // Creating JWT token with user ID and user name, expires after certain time
}

// Comparing the user entered password with hashed password in the database
UserSchema.methods.comparePassword = async function(userPassword) {
    const isAMatch = await bcrypt.compare(userPassword, this.password); // comparing the passwords
    return isAMatch; // returning true if they match, else false
}

// Exporting the model with User Schema
module.exports = model('User', UserSchema);
```