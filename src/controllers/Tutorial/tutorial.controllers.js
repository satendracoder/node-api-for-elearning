const asyncHandler = require("../../utils/asyncHandler.js");
const ApiError = require("../../utils/ApiError.js");
const User = require("../../models/User/user.models.js");
const uploadOnCloudinary = require("../../utils/cloudunary.js");
const ApiResponse = require("../../utils/ApiResponse.js");


//@ User create for blog page
//@router  POST /api/post/get-posts
//@access private
const AllGetPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({user_id: req.user._id});
    res.status(200).json({message:"All posts you made are here", Total_Posts:posts.length, posts});
})


//@ User create for post page
//@router  POST /api/post/create-post
//@access private
const createPost = asyncHandler(async (req, res) => {
  const {title,description,baiseUrl,keywords,thumbnail,isPublish,contentPost} = req.body;
  if([title,description,baiseUrl,keywords,thumbnail, isPublish,contentPost].some((filed)=>filed?.trim()==="")){
    res.status(400).json({message:"Please check all filed", createPost})
    throw new ApiError(400, "All fields are required");
  }

  const post = await Post.create({
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
  res.status(200).json({message:"Create a Successfuly Posts", createPost});
})


//@ User create for post page
//@router  POST /api/post/get-
//@access private
const GetPostById = asyncHandler(async (req, res) => {
   const post = await Post.findById(req.params.id);
   if(!post){
      res.status(404);
      throw new Error("Data is not found")
   }
   res.status(200).json(post);
})

//@ User create for post page
//@router  POST /api/post/update-post
//@access private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(!post){
    res.status(404);
    throw new Error("Blog Pages not found Please Move to Main menu");
  }

  if(post.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User don't have permission to update");
  }
  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );
  res.status(200).json(updatePost)
});

//@ User delete for post page
//@router  DELETE /api/post/delete-post
//@access private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(!post){
    res.status(404);
    throw new Error("Data is not found here");
  }

  if(post.user_id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User don't have permission to update other user Post page");
  } 
  await Post.deleteOne({_id: req.params.id});
  res.status(200).json({message:"The Post has been removed from here successfuly", post});
});




//export modules while files
module.exports = {
  createTutorial,
  getTutorial,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  resetPasswordWithEmail,
  getCurrentUser,
  updateAccountDetails,
};
