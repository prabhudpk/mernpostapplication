const express = require("express");
const router = express.Router();
const Post = require("../../models/posts");
const addPost = async (req, res) => {
  const newPost = new Post(req.body).save();
  res.status(200).json({ message: "Post added successfully" });
};

const getAllPosts = async (req, res) => {
  const { user_id } = req.params;
  console.log('user_id: ', user_id);
  const posts = await Post.find({ user_id });
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
router.get("/get-posts/:user_id", getAllPosts);
router.post("/add-post", addPost);
router.post("/update-post/:id", editPost);
router.delete("/delete-post/:id", deletePost);

module.exports = router;
