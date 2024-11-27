const express = require('express');
const router = express.Router();
const {AllGetPosts, createPost, GetPostById, updatePost, deletePost} = require('../controllers/post.controllers');
const verifyJWT = require('../middlewares/auth.middlewares');
const adminAccess = require('../middlewares/adminAuth.middlewares');

router.use(verifyJWT)
router.route("/get-posts").get(AllGetPosts);
router.route("/get-post/:id").get(GetPostById);
router.route("/create-post").post(createPost);
router.route("/update-post/:id").post(updatePost);
router.route("/delete-post/:id").delete(adminAccess,deletePost);

module.exports = router;