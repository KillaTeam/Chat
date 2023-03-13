require('dotenv').config();
const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/uset-dto')
const ApiError = require('../exception/api-error')

const saltRounds = 10;

class UserService {
    async registration(name, email, password) {
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw ApiError.BadRequest(`User ${name} already registered`)
            // return null;
        }
        
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const activationLink = uuid.v4()
        const user = await UserModel.create({name: name, email: email, password: hashPassword, activationLink: activationLink})
        // await mailService.sendActivationMail(name, email, `${process.env.API_URL}/activate/${activationLink}`)
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
            throw ApiError.BadRequest(`Link not found`)
        }
        user.isActivated = true
        await user.save();
    }
    async login(email, password){
        const user = await UserModel.findOne({email})    
        if(!user){
            throw ApiError.BadRequest('User not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals){
            throw ApiError.BadRequest('Password mismatch')
        }
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }
    async getAllUsers(){
        const users = await UserModel.find()
        return users;
    }
}

module.exports = new UserService();