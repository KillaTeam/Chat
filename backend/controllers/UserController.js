const userService = require('../service/userService')

class UserController {
    async register (req, res) {
        try {
            const {name, email, password} = req.body
            if (!name || !email || !password) {
                return res.status(404).json({
                    message: `Не допустимые значения`
                })
            }
            const userData = await userService.registration(name, email, password);
            if(userData == null) {
                return res.status(404).json({'ErrorMessage': 'Пользователь уже существует'})
            }
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
            const {link} = req.params;
            console.log(link);
            if(!link) return res.status(404)
            await userService.activateLink(link)
            return res.redirect('https://www.google.com/')
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