const { body, validationResult } = require("express-validator");

exports.validateUpdateBlog = [
  body("title").notEmpty().withMessage("title is required"),
  body("body")
    .notEmpty()
    .withMessage("body is required")
    .isLength({ min: 200 })
    .withMessage("Content is too short"),
];

exports.isRequestValidated = (request, response, next) => {
  const errors = validationResult(request);
  if (errors.array().length > 0) {
    return response.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
