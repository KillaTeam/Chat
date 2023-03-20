const UserModel = require('../models/user-model')

module.exports = function (io) {
    io.use(async (socket, next)=>{
        // const username = socket.handshake.auth.email
        // if(!username) {
        //     return next(new Error("invalid username"))
        // }
        const email = socket.handshake.auth.email
        if(!email){
            return next(new Error("invalid email"))
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return next(new Error("User not Found"))
        }
        socket.email = email
        next()
    })
}