const express = require('express');
const router = express.Router();
const {
    AllGetDetailsubTutorial,
    GetDetailsubTutorialById,
    createDetailsubTutorial,
    updateDetailsubTutorial,
    deleteDetailsubTutorial
} = require('../../controllers/Tutorial/subtutorialdetails.controllers.js')
const verifyJWT = require('../../middlewares/auth.middlewares');
const adminAccess = require('../../middlewares/adminAuth.middlewares.js');

router.use(verifyJWT)
router.route("/get-detailsubtutorials").get(AllGetDetailsubTutorial);
router.route("/get-detailsubtutorial/:id").get(GetDetailsubTutorialById);
router.route("/create-detailsubtutorial").post(createDetailsubTutorial);
router.route("/update-detailsubtutorial/:id").post(updateDetailsubTutorial);
router.route("/delete-detailsubtutorial/:id").delete(adminAccess,deleteDetailsubTutorial);

module.exports = router;