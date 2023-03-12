const {Schema, model} = require('mongoose')
require('dotenv').config()

const UserSchema = new Schema({
    name: {type: String, required: true, unique: true, maxLength: process.env.MAX_USERNAME_LENGTH},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, default: false},
    activationLink: {type: String}
})

module.exports = model('User', UserSchema)