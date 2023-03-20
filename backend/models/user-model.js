const {Schema, model} = require('mongoose')
require('dotenv').config()

const UserSchema = new Schema(
    {
        name: {type: String, required: true, unique: true, maxLength: process.env.MAX_USERNAME_LENGTH},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isActivated: {type: Boolean, default: false},
        activationLink: {type: String},
        isOnline: {type:Boolean, default: false},
        socketId: {type: String}
    },
    {
        timestamps: true,
        collection: 'users'
    }
)

module.exports = model('User', UserSchema)