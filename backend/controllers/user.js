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
