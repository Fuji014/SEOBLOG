const express = require("express");
const router = express.Router();

// controller
const {
  createCategory,
  getAllCategory,
  getSingleCategory,
  deleteCategory,
} = require("../controllers/category");

// middleware
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

// routes
router
  .route("/category")
  .get(getAllCategory)
  .post(requireSignin, authMiddleware, adminMiddleware, createCategory);

router
  .route("/category/:slug")
  .get(getSingleCategory)
  .delete(requireSignin, authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;
