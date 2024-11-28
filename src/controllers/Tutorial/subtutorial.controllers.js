const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const Tutorial = require("../../models/Tutorial/tutorial.models.js"); 
const SubTutorial = require("../../models/Tutorial/subTutorial.models.js");
const uploadOnCloudinary = require("../../utils/cloudunary.js");



//@ User create for blog page
//@router  POST /api/post/get-posts
//@access private
const AllGetsubTutorial = asyncHandler(async (req, res) => {
    const subtutorial = await SubTutorial.find({});
    res.status(200).json({message:"All subtutorial you made are here", Total_Tutorial:subtutorial.length, subtutorial});
})


//@ User create for post page
//@router  POST /api/post/create-post
//@access private
const createsubTutorial = asyncHandler(async (req, res) => {
  const {title,description, tutorial_id} = req.body;
  if([title,description,tutorial_id].some((filed)=>filed?.trim()==="")){
    res.status(400).json({message:"Please check all filed", createsubTutorial})
    throw new ApiError(400, "All fields are required");
  }

    // Validate tutorial_id exists in the Tutorial collection
  const tutorialExists = await Tutorial.findById(tutorial_id);
  if (!tutorialExists) {
    res.status(404).json({ message: "Invalid tutorial_id: Tutorial not found" });
    throw new ApiError(404, "Tutorial not found");
  }

  const subtutorial = await SubTutorial.create({
    title,
    description,
    tutorial_id
  });
  res.status(200).json({message:"Create a Successfuly Posts", subtutorial});
})


//@ User create for post page
//@router  POST /api/post/get-
//@access private
const GetsubTutorialById = asyncHandler(async (req, res) => {
   const subtutorial = await SubTutorial.findById(req.params.id);
   if(!subtutorial){
      res.status(404);
      throw new Error("Data is not found")
   }
   res.status(200).json(subtutorial);
})

//@ User create for post page
//@router  POST /api/post/update-post
//@access private
const updatesubTutorial = asyncHandler(async (req, res) => {
  const subtutorial = await SubTutorial.findById(req.params.id);
  if(!subtutorial){
    res.status(404);
    throw new Error("Blog Pages not found Please Move to Main menu");
  }

  const updatesubTutorial = await SubTutorial.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updatesubTutorial)
});





//@ User delete for post page
//@router  DELETE /api/post/delete-post
//@access private
const deletesubTutorial = asyncHandler(async (req, res) => {
  const subtutorial = await SubTutorial.findById(req.params.id);
  if(!subtutorial){
    res.status(404);
    throw new Error("Data is not found here");
  }
 
  await SubTutorial.deleteOne({_id: req.params.id});
  res.status(200).json({message:"The Post has been removed from here successfuly", SubTutorial});
});




//export modules while files
module.exports = {
  AllGetsubTutorial,
  createsubTutorial,
  GetsubTutorialById,
  updatesubTutorial,
  deletesubTutorial
};
