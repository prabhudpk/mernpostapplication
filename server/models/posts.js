const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt:{type: Date, required: true, default: new Date()}
  
});

module.exports = mongoose.model("posts", postSchema, "posts");
