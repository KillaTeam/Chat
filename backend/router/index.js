const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();;
const {body} = require('express-validator');

router.post('/register',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    UserController.register)
router.post('/login', UserController.login )
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

router.get('/users', authMiddleware, UserController.getUsers)

module.exports = router;