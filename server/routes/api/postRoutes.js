const express = require("express");
const router = express.Router();
const Post = require("../../models/posts");
const addPost = async (req, res) => {
  const newPost = new Post(req.body).save();
  res.status(200).json({ message: "Post added successfully" });
};

const getSinglePost = async (req, res) => {
  const { post_id } = req.params;
  console.log('post_id: ', post_id);
  const posts = await Post.findById(post_id);
  res.status(200).json(posts);
};
const getAllPosts = async (req, res) => {
  
  const posts = await Post.find().sort({ createdAt: -1 }).populate({
    path: 'user_id',
    select: '-password' // Exclude the 'password' field
  });
  res.status(200).json(posts);
};
const editPost = async (req, res) => {
  const { id } = req.params;
  const updateContent = req.body;
  const postUpdate = await Post.findByIdAndUpdate(id, updateContent);
  res.status(200).json({ message: "Post updated successfully" });
};
const deletePost = async (req, res) => {
  const { id } = req.params;
  const deletePost = await Post.findByIdAndDelete(id);
  res.status(200).json({ message: "Post deleted successfully" });
};
router.get("/get-posts", getAllPosts);
router.get("/get-post/:post_id", getSinglePost);
router.post("/add-post", addPost);
router.post("/update-post/:id", editPost);
router.delete("/delete-post/:id", deletePost);

module.exports = router;
