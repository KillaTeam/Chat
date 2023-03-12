const userService = require('../service/userService')

class UserController {
    async register (req, res, next) {
        try {
            const {name, email, password} = req.body;
            const userData = await userService.registration(name, email, password);

            res.cookie('refreshToken', userData.refresh_token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })

            return res.json(userData);
        } catch (err) {
            console.log(err);
        }
    }
    async login (req, res, next) {
        try {
            res.json({message: "OGO, Nahera vono nuzno, NAHERA"});
        } catch (err) {
            console.log(err);
        }
    }
    async logout (req, res, next) {
        try {
            res.json({message: "OGO, Nahera vono nuzno, NAHERA"});
        } catch (err) {
            console.log(err);
        }
    }
    async activate (req, res, next) {
        try {
            res.json({message: "OGO, Nahera vono nuzno, NAHERA"});
        } catch (err) {
            console.log(err);
        }
    }
    async refresh (req, res, next) {
        try {
            res.json({message: "OGO, Nahera vono nuzno, NAHERA"});
        } catch (err) {
            console.log(err);
        }
    }
    async getUsers (req, res, next) {
        try {
            res.json({message: "OGO, Nahera vono nuzno, NAHERA"});
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new UserController();