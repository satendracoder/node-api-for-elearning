const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const SubTutorial = require("../../models/Tutorial/subTutorial.models.js");
const DetailSubTutorial = require("../../models/Tutorial/subTutorialDetails.js");
const uploadOnCloudinary = require("../../utils/cloudunary.js");



//@ User create for blog page
//@router  POST /api/post/get-posts
//@access private
const AllGetDetailsubTutorial = asyncHandler(async (req, res) => {
    const detailsubtutorial = await DetailSubTutorial.find({});
    res.status(200).json({message:"All subtutorial you made are here", Total_Tutorial:detailsubtutorial.length, detailsubtutorial});
})


//@ User create for post page
//@router  POST /api/post/create-post
//@access private
const createDetailsubTutorial = asyncHandler(async (req, res) => {
  const {title,content,subTutorial_id,description, Keyword} = req.body;
  if([title,content,subTutorial_id,description, Keyword].some((filed)=>filed?.trim()==="")){
    res.status(400).json({message:"Please check all filed", createDetailsubTutorial})
    throw new ApiError(400, "All fields are required");
  }

    // Validate tutorial_id exists in the Tutorial collection
  const subTutorialExists = await SubTutorial.findById(subTutorial_id);
  if (!subTutorialExists) {
    res.status(404).json({ message: "Invalid tutorial_id: Tutorial not found" });
    throw new ApiError(404, "Tutorial not found");
  }

  const detailsubtutorial = await DetailSubTutorial.create({
    title,
    content,
    subTutorial_id,
    description,
    Keyword
  });
  res.status(200).json({message:"Create a Successfuly Posts", detailsubtutorial});
})


//@ User create for post page
//@router  POST /api/post/get-
//@access private
const GetDetailsubTutorialById = asyncHandler(async (req, res) => {
   const detailsubtutorial = await DetailSubTutorial.findById(req.params.id);
   if(!detailsubtutorial){
      res.status(404);
      throw new Error("Data is not found")
   }
   res.status(200).json(detailsubtutorial);
})

//@ User create for post page
//@router  POST /api/post/update-post
//@access private
const updateDetailsubTutorial = asyncHandler(async (req, res) => {
  const detailsubtutorial = await DetailSubTutorial.findById(req.params.id);
  if(!detailsubtutorial){
    res.status(404);
    throw new Error("Blog Pages not found Please Move to Main menu");
  }

  const updateDetailsubTutorial = await SubTutorial.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updateDetailsubTutorial)
});





//@ User delete for post page
//@router  DELETE /api/post/delete-post
//@access private
const deleteDetailsubTutorial = asyncHandler(async (req, res) => {
  const detailsubtutorial = await DetailSubTutorial.findById(req.params.id);
  if(!detailsubtutorial){
    res.status(404);
    throw new Error("Data is not found here");
  }
 
  await DetailSubTutorial.deleteOne({_id: req.params.id});
  res.status(200).json({message:"The Post has been removed from here successfuly", DetailSubTutorial});
});




//export modules while files
module.exports = {
  AllGetDetailsubTutorial,
  createDetailsubTutorial,
  GetDetailsubTutorialById,
  updateDetailsubTutorial,
  deleteDetailsubTutorial
};
