const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");

// @desc Signup
// @route POST /api/signup
// @access  Public
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  let username = shortId.generate();
  let profile = `${process.env.CLIENT_URL}/profile/${username}`;

  const userCreate = await User.create({
    name,
    email,
    password,
    profile,
    username,
  });

  if (userCreate) {
    // generate a token and send to client
    const token = jwt.sign({ _id: userCreate._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    res.status(201).json({
      user: {
        _id: userCreate._id,
        name: userCreate.name,
        email: userCreate.email,
        username: userCreate.username,
      },
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Signin
// @route POST /api/signin
// @access  Public
exports.signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exist and check password
  const user = await User.findOne({ email });

  if (user && (await user.authenticate(password))) {
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;

    res.status(200).json({
      token,
      user: { _id, username, name, email, role },
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc Logout
// @route GET /api/signout
// @access  Private
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};
