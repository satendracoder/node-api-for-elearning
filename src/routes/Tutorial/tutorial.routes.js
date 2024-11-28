const express = require('express');
const router = express.Router();
const { AllGettutorial,
    createTutorial,
    updateTutorial, GetTutorialById, deleteTutorial } = require('../../controllers/Tutorial/tutorial.controllers')
const verifyJWT = require('../../middlewares/auth.middlewares');
const adminAccess = require('../../middlewares/adminAuth.middlewares.js');

router.use(verifyJWT)
router.route("/get-tutorials").get(AllGettutorial);
router.route("/get-tutorial/:id").get(GetTutorialById);
router.route("/create-tutorial").post(createTutorial);
router.route("/update-tutorial/:id").post(updateTutorial);
router.route("/delete-tutorial/:id").delete(adminAccess,deleteTutorial);

module.exports = router;