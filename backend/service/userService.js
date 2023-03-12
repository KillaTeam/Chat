const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/uset-dto')

const saltRounds = 10;

class UserService {
    async registration(name, email, password) {
        const candidate = await UserModel.findOne({email})
        if(candidate){
            return res.status(401).json({message: `Такой пользователь уже существует`})
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuid.v4()
        const user = await UserModel.create({name: name, email: email,password: hashPassword, activationLink: activationLink})
        await mailService.sendActivationMail(email, activationLink)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();