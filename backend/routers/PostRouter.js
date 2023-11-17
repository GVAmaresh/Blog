const postController = require('../controllers/PostController')
const userController = require('../controllers/UserController')
const express = require('express')
const router = express.Router();


router.route('/getAllPost').get(postController.getAllPost)
router.route('/getPost').post(postController.getPost)
router.route('/getPost').get(postController.getPost)

router.route('/searchPost/:title').get(postController.searchPost)
router.route('/newPost').post(userController.protect, postController.createPost)

router.route('/deletePost/:id').delete(userController.protect, postController.deletePost)
router.route('/deleteAllPost/').delete(userController.protect, postController.deleteAllPost)

module.exports = router;