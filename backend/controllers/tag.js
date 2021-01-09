const Tag = require("../models/tag");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// @desc Fetch all tags
// @route GET /api/tag
// @access Private
exports.getAllTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find({});

  if (tags) {
    res.status(200).json(tags);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc Fetch single tag
// @route GET /api/tag/:slug
// @access Private
exports.getSingleTag = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  const tag = await Tag.findOne({ slug });
  if (tag) {
    res.status(200).json(tag);
  } else {
    res.status(400);
    throw new Error("Tag not found");
  }
});

// @desc Create new tag
// @route POST /api/tag
// @access  Private/Admin
exports.createTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const slug = slugify(name).toLowerCase();

  const tag = new Tag({
    name,
    slug,
  });

  try {
    const createdTag = await tag.save();

    res.status(201).json(createdTag);
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc Delete tag
// @route Delete /api/tag/:slug
// @access Private/Admin
exports.deleteTag = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  const tag = await Tag.findOne({ slug });
  if (tag) {
    await tag.remove();
    res.status(200).json(tag);
  } else {
    res.status(400);
    throw new Error("Tag not found");
  }
});
