const User = require("../models/user");
const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

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
