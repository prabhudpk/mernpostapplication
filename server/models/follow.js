const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower_id: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  
  followed_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
});

module.exports = mongoose.model("follow", followSchema, "follow");
