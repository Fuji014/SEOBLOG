const User = require("../models/user");
const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");
const formidable = require("formidable");
const fs = require("fs");

// @desc Get user profile
// @route GET /api/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = req.profile;
  res.status(200).json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    about: user.about,
    photo: user.photo,
  });
});

// @desc Get public profile
// @route GET /api/user/:username
// @access Public
exports.getPublicProfile = asyncHandler(async (req, res) => {
  const username = req.params.username;

  const user = await User.findOne({ username }).select(
    "_id name email profile username updatedAt"
  );
  if (user) {
    const userId = user._id;

    const blog = await Blog.find({ postedBy: userId })
      .populate("categories", "_id name slug")
      .populate("tags", "_id name slug")
      .populate("postedBy", "_id name")
      .limit(10)
      .select(
        "_id title slug exerpt categories tags postedBy createdAt updatedAt"
      );

    if (blog) {
      res.status(200).json({ user, blog });
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/profile
// @access Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  User.findById(req.user._id).exec((err, oldUser) => {
    // error handler
    if (err) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // formidable
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      // handle form error
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }

      // destruct fields
      const { name, email, about, password } = fields;

      // checking process

      if (name) {
        oldUser.name = name;
      }

      if (email) {
        oldUser.email = email;
      }

      if (about) {
        oldUser.about = about;
      }

      if (password) {
        oldUser.password = password;
      }

      if (files.photo) {
        // check if photo is > 1mb
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }

        oldUser.photo.data = fs.readFileSync(files.photo.path);
        oldUser.photo.contentType = files.photo.type;
      }

      // update user profile
      oldUser.save((err, result) => {
        // handle error while saving updated profile
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        }

        return res.status(200).json(result);
      });
    });
  });
});

// @desc Get profile photo
// @route GET /api/profile/:username
// @access Public
exports.getUserPhoto = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select(
    "photo"
  );

  if (user) {
    // res.set("Content-Type", blog.photo.contentType);
    res.contentType(user.photo.contentType);
    res.status(200).send(user.photo.data);
  } else {
    res.status(404);
    throw new Error("Photo not found");
  }
});
