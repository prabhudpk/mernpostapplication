
const express = require("express");

// const Users = require("../../controllers/users");
const router = express.Router();
const UserSchema = require("../../models/user");

const bcrypt = require("bcrypt");
const salt = process.env.password_salt;

const addUser = async (req, res) => {
  const { username, password, name, email } = req.body;
  let userData = {
    username,
    name,
    email,
    password,
  };
  bcrypt.hash(password, salt, async function (err, hash) {
    if (!err) {
      userData.password = hash;
      const currUser = await UserSchema.find({ username });
      if (currUser.length > 0) {
        res.status(500).json({ message: "User already exists" });
      } else {
        let userDoc = new UserSchema(userData).save();
        res.status(200).json({ message: "User added sucessfully" });
      }
    } else {
      res.status(500).json(err.message);
    }
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const userDoc = await UserSchema.findById(id, { password: 0 });
  console.log('userDoc: ', userDoc);
  if (userDoc) res.status(200).json(userDoc);
  else res.status(500).json({ message: "User not found" });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const currUser = await UserSchema.find({ username });
    if (!(currUser.length > 0)) {
      res.status(404).json({ message: "User not found" });
    } else {
      bcrypt.compare(
        password,
        currUser[0]?.password,
        function (err, result) {
          if (result) {
            console.log("currUser[0]", currUser[0]);
            currUser[0].password = "";
            res.status(200).json(currUser?.[0]);
          } else {
            res.status(500).json({ message: "Password mismatch" });
          }
        }
      );
    }
  } catch (error) {
    console.log("error", error);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted user successfully" });
  } catch (error) {
    console.log("error: ", error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await UserSchema.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("error: ", error);
  }
};



router.get("/get-user/:id", getUserById);
router.post("/add-user", addUser);
router.post("/login", login);
router.delete("/delete-user/:id", deleteUsers);
router.put("/update-user/:id", updateUser);
module.exports = router;
