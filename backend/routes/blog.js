const express = require("express");
const router = express.Router();

// controller
const {
  createBlog,
  getAllBlog,
  deleteBlog,
  updateBlog,
  getSingleBlog,
  getPhoto,
  getRelated,
  getLatestBlog,
} = require("../controllers/blog.js");

// middleware
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

// validators
const {
  validateUpdateBlog,
  isRequestValidated,
} = require("../validators/blog");

// routes
router.get("/blog/latest", getLatestBlog);

router
  .route("/blog")
  .get(getAllBlog)
  .post(requireSignin, authMiddleware, adminMiddleware, createBlog);

router
  .route("/blog/:slug")
  .get(getSingleBlog)
  .put(requireSignin, authMiddleware, adminMiddleware, updateBlog)
  .delete(requireSignin, authMiddleware, adminMiddleware, deleteBlog);

router.get("/blog/photo/:slug", getPhoto);

router.post("/blog/related", getRelated);

module.exports = router;
