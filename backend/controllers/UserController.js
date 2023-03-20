const userService = require('../service/userService')
const {validationResult} = require('express-validator');
const ApiError = require('../exception/api-error')

class UserController {
    async register (req, res, next) {
        try {
            // const errors = validationResult(req)
            // if(errors.isEmpty()){
            //     return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            // }
            const {name, email, password} = req.body
            const userData = await userService.registration(name, email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }
    async login (req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({message: 'User was logged out'});
        } catch (err) {
            next(err);
        }
    }
    async activate (req, res, next) {
        try {
            const {link} = req.params;
            if(!link) return res.status(404)
            await userService.activateLink(link)
            return res.redirect(process.env.URL_FOR_REDIRECT_AFTER_ACRIVATION)
        } catch (err) {
            next(err);
        }
    }
    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData);
        } catch (err) {
            next(err);
        }
    }
    async getUsers (req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();