const express = require('express');
const router = express.Router();
const { AllGetsubTutorial, GetsubTutorialById, createsubTutorial , updatesubTutorial, deletesubTutorial} = require('../../controllers/Tutorial/subtutorial.controllers.js')
const verifyJWT = require('../../middlewares/auth.middlewares');
const adminAccess = require('../../middlewares/adminAuth.middlewares.js');

router.use(verifyJWT)
router.route("/get-subtutorials").get(AllGetsubTutorial);
router.route("/get-subtutorial/:id").get(GetsubTutorialById);
router.route("/create-subtutorial").post(createsubTutorial);
router.route("/update-subtutorial/:id").post(updatesubTutorial);
router.route("/delete-subtutorial/:id").delete(adminAccess,deletesubTutorial);

module.exports = router;