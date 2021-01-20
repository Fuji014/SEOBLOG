const express = require("express");
const router = express.Router();

// controller
const {
  getUserProfile,
  getPublicProfile,
  updateUserProfile,
  getUserPhoto,
} = require("../controllers/user");

// middleware
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

router
  .route("/profile")
  .get(requireSignin, authMiddleware, getUserProfile)
  .put(requireSignin, authMiddleware, updateUserProfile);

router.get("/profile/:username", getUserPhoto);

router.get("/user/:username", getPublicProfile);

module.exports = router;
