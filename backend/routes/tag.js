const express = require("express");
const router = express.Router();

// controller
const {
  getAllTags,
  getSingleTag,
  createTag,
  deleteTag,
} = require("../controllers/tag");

// middleware
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

// routes
router
  .route("/tag")
  .get(getAllTags)
  .post(requireSignin, authMiddleware, adminMiddleware, createTag);

router
  .route("/tag/:slug")
  .get(getSingleTag)
  .delete(requireSignin, authMiddleware, adminMiddleware, deleteTag);

module.exports = router;
