const express = require("express");
const router = express.Router();

// controller
const { signup, signin, signout } = require("../controllers/auth");

// middleware
const {
  requireSignin,
  authMiddleware,
  adminMiddleware,
} = require("../middleware/auth.middleware");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
//
router.get(
  "/secret",
  requireSignin,
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: req.user,
    });
  }
);

module.exports = router;
