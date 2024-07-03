const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  
  followed: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
});

module.exports = mongoose.model("follow", followSchema, "follow");
