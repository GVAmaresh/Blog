const User = require('../controllers/UserController')
const express = require('express')
const router = express.Router()

router.route('/signup').post(User.signup)
router.route('/login').post(User.login)
router.route('/comment').post(User.protect, User.commentSection)
router.route('/isLoggedIn').get(User.isLoggedIn)

module.exports = router