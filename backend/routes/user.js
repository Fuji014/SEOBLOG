const express = require("express");
const router = express.Router();

// controller
const { getUserProfile, getPublicProfile } = require("../controllers/user");

// middleware
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

router.get("/profile", requireSignin, authMiddleware, getUserProfile);

router.get("/user/:username", getPublicProfile);

module.exports = router;
