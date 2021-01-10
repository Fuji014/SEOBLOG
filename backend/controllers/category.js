const Category = require("../models/category");
const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// @desc Create category
// @route GET /api/category
// @access  Private/Admin
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const slug = slugify(name).toLowerCase();

  const category = new Category({
    name,
    slug,
  });

  try {
    const createdCategory = await category.save();

    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc Fetch all category
// @route GET /api/category
// @access  Private
exports.getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400);
    throw new Error("Something Went wrong");
  }
});

// @desc  Fetch single  category
// @route GET /api/category/:slug
// @access  Private
exports.getSingleCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  const category = await Category.findOne({ slug });

  const blogs = await Blog.find({ categories: category, status: { $eq: true } })
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name");

  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(400);
    throw new Error("Category not found");
  }
});

// @desc Delete category
// @route delete /api/category/:slug
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const slug = req.params.slug.toLowerCase();

  const category = await Category.findOne({ slug });

  if (category) {
    await category.remove();
    res.status(200).json(category);
  } else {
    res.status(400);
    throw new Error("Category not found");
  }
});
