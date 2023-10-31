const User = require('../controllers/UserController')
const express = require('express')
const router = express.Router()

router.route('/signup').post(User.signup)
router.route('/login').post(User.login)
router.route('/comment/:id').post(User.protect, User.commentSection)

module.exports = router