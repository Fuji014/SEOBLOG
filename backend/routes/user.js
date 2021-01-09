const express = require("express");
const router = express.Router();

// controller
const { getUserProfile } = require("../controllers/user");

// middleware
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

router.get("/profile", requireSignin, authMiddleware, getUserProfile);

module.exports = router;
