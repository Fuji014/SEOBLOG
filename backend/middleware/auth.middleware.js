const expressJwt = require("express-jwt");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
});

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  const authUserId = req.user._id;

  if (authUserId) {
    try {
      req.profile = await User.findById(authUserId).select("-hashed_password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorize, token failed");
    }
  } else {
    res.status(400);
    throw new Error("Not authorize, no token");
  }
});

exports.adminMiddleware = (req, res, next) => {
  if (req.profile && req.profile.role === 1) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
};
