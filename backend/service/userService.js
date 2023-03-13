require('dotenv').config();
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
            // throw new Error(`Данный пользователь уже существует`)
            return null;
        }
        
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const activationLink = uuid.v4()
        const user = await UserModel.create({name: name, email: email, password: hashPassword, activationLink: activationLink})
        await mailService.sendActivationMail(name, email, `${process.env.API_URL}/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
    async activateLink (link) {
        const user = await UserModel.findOne({activationLink: link})
        if(!user){
            throw new Error("Не действительная ссылка")
        }
        user.isActivated = true
        await user.save();
    }
}

module.exports = new UserService();