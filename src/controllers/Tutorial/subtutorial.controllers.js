const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const Tutorial = require("../../models/Tutorial/tutorial.models.js");
const uploadOnCloudinary = require("../../utils/cloudunary.js");



//@ User create for blog page
//@router  POST /api/post/get-posts
//@access private
const AllGetPtutorial = asyncHandler(async (req, res) => {
    const tutorial = await Tutorial.find({});
    res.status(200).json({message:"All posts you made are here", Total_Tutorial:tutorial.length, tutorial});
})


//@ User create for post page
//@router  POST /api/post/create-post
//@access private
const createTutorial = asyncHandler(async (req, res) => {
  const {title,description,baiseUrl,keywords,thumbnail,isPublish,contentPost} = req.body;
  if([title,description,baiseUrl,keywords,thumbnail, isPublish,contentPost].some((filed)=>filed?.trim()==="")){
    res.status(400).json({message:"Please check all filed", createTutorial})
    throw new ApiError(400, "All fields are required");
  }

  const tutorial = await Tutorial.create({
    title,
    description,
    baiseUrl,
    keywords,
    baiseUrl,
    thumbnail,
    isPublish,
    contentPost,
    user_id: req.user._id
  });
  res.status(200).json({message:"Create a Successfuly Posts", createTutorial});
})


//@ User create for post page
//@router  POST /api/post/get-
//@access private
const GetTutorialById = asyncHandler(async (req, res) => {
   const tutorial = await Tutorial.findById(req.params.id);
   if(!tutorial){
      res.status(404);
      throw new Error("Data is not found")
   }
   res.status(200).json(tutorial);
})

//@ User create for post page
//@router  POST /api/post/update-post
//@access private
const updateTutorial = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);
  if(!tutorial){
    res.status(404);
    throw new Error("Blog Pages not found Please Move to Main menu");
  }

  if(tutorial.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User don't have permission to update");
  }
  const updateTutorial = await Tutorial.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updateTutorial)
});

//@ User delete for post page
//@router  DELETE /api/post/delete-post
//@access private
const deleteTutorial = asyncHandler(async (req, res) => {
  const tutorial = await Tutorial.findById(req.params.id);
  if(!post){
    res.status(404);
    throw new Error("Data is not found here");
  }

  if(post.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User don't have permission to update other user Post page");
  } 
  await Tutorial.deleteOne({_id: req.params.id});
  res.status(200).json({message:"The Post has been removed from here successfuly", tutorial});
});




//export modules while files
module.exports = {
  AllGetPtutorial,
  createTutorial,
  GetTutorialById,
  updateTutorial,
  deleteTutorial
};
