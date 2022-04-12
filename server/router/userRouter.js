const express = require("express");
const argon2 = require("argon2");
const router = express.Router();

const User = require("../model/UserModel");
const generateToken = require("../utils/generateToken");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/checkAdmin");

//@route POST api/users/login
//@des login account
//@access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password or Email" });

    // check email done
    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password or Email" });

    const accessToken = await generateToken(user._id);

    res.json({ success: true, accessToken,  user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route POST api/users/register
//@des register a new user
//@access Public
router.post("/register", async (req, res) => {
  const { username, email, password} = req.body;

  try {
    const user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashPassword = await argon2.hash(password);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const accessToken = await generateToken(newUser._id);

    res
      .status(201)
      .json({ success: true, message: "You register success", accessToken, user : newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error server",
    });
  }
});

//@route GET /api/users/profile
//@des get user profile
//@access Private

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "error message" });
  }
});

//@route PUT api/users/profile
//@des update user profile
//@access private

router.put("/profile", protect, async (req, res) => {
  const { username, email, password } = req.body;
  try {

    const hashPassword = await argon2.hash(password);
    let updateUser = {
      username,
      password : hashPassword ,
      email,
    };

    const updateUserCondition = { _id: req.userId };

    updateUser = await User.findOneAndUpdate(updateUserCondition, updateUser, {
      new: true,
    });

    if (!updateUser)
      return res
        .status(401)
        .json({ success: false, message: "Update user failure" });

    res.json({
      success: true,
      message: "Update user seccussfully",
      user : updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Error server" });
  }
});

//@route GET api/users/admin
//@des get all users
//@access private/admin

router.get("/admin", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user && user.isAdmin) {
      const all = await User.find({}).select("-password");
      return res.json({ success: true, users : all });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, message: "Error server" });
  }
});

//@router DELETE api/user/admin/:id
//@des delete user
//@access private/admin

router.delete("/admin/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (user && user.isAdmin) {
      const deleteUser = await User.findById(req.params.id);

      if (!deleteUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const userDel = await User.findOneAndDelete({ _id: req.params.id });

      return res.json({
        success: true,
        message: "Delete user successful",
        userDel,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, message: "Error server" });
  }
});

//@route GET api/users/admin/:id
//@des get user by id
//access private/admin

router.get("/admin/:id", protect, async (req, res) => {
  try {
    const admin = await User.findById(req.userId);

    if (admin && admin.isAdmin) {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res.json({ success: true, user });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, message: "Error server" });
  }
});

//@route PUT api/users/admin/:id
//@des update user by id
//access private/admin

router.put("/admin/:id", protect, async (req, res) => {
  const { isAdmin } = req.body;
  try {
    const admin = await User.findById(req.userId);

    if (admin && admin.isAdmin) {

      let updateUser = {
        isAdmin,
      };

      updateUser = await User.findOneAndUpdate({ _id: req.params.id}, updateUser, {
        new: true,
      });

      if (!updateUser)
        return res
          .status(402)
          .json({ success: false, message: "Update Failure" });

      return res.json({
        success: true,
        message: "Update successfully",
        user : updateUser,
      });
    }

    return res
      .status(404)
      .json({ success: false, message: "Not authorized as an admin" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, message: "Error server" });
  }
});

module.exports = router;
