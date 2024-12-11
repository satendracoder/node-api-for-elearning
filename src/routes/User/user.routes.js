const express = require('express');

const upload = require("../../middlewares/multer.middlewares");
const verifyJWT = require('../../middlewares/auth.middlewares');
const {
    loginUser,
    registerUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    resetPasswordWithEmail,
    updateAccountDetails,
    resetPasswordwithtoken
} = require('../../controllers/User/user.controllers');


const router = express.Router();

router.route("/register").post(
//    upload.fields([
//        {
//         name:"avatar",
//         maxCount:1
//        },
//        {
//         name:"coverImage",
//         maxCount:1
//        }
//    ]),
    registerUser
)

router.route("/login").post(loginUser)

//secured router
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/reset-password").post(resetPasswordWithEmail)
router.route("/reset-password/:id").post(verifyJWT, resetPasswordwithtoken)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

module.exports = router;