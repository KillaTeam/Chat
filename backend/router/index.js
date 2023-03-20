const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth-middleware');

const events = require('events')
const emitter = new events.EventEmitter()

const router = express.Router();;
const {body} = require('express-validator');

router.post('/register',
    // body('email').isEmail(),
    // body('password').isLength({min: 3, max: 32}),
    UserController.register)
router.post('/login', UserController.login )
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

router.post('/post-messages', (req, res) => {
    const {message} = req.body
    emitter.emit('newMessage', message)
    res.status(200).json(message)
})

router.get('/users', authMiddleware, UserController.getUsers)

module.exports = router;