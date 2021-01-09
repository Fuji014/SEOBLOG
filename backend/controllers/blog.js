const Blog = require("../models/blog");
const Category = require("../models/category");
const Tag = require("../models/tag");
const asyncHandler = require("express-async-handler");
const formidable = require("formidable");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const slugify = require("slugify");
const fs = require("fs");
const short = require("short-uuid");
const { smartTrim } = require("../helpers/smartTrim");
const { update, findOne } = require("../models/blog");

// @desc Create blog
// @route POST /api/blog
// @access Private/Admin
exports.createBlog = asyncHandler(async (req, res) => {
  const title = `Sample Title ${short.uuid()}`;
  const body =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  const blog = new Blog({
    title,
    body,
    exerpt: smartTrim(body, 320, " ", "..."),
    slug: slugify(title).toLowerCase(),
    mtitle: `${title} | ${process.env.APP_NAME}`,
    mdescription: stripHtml(body.substring(0, 160)).result,
    postedBy: req.user._id,
    categories: "5ff30c29cf08191ab42408c5",
    tags: "5fe5c4e0aa9f7e1d54850b37",
  });

  const createdBlog = await blog.save();
  if (createdBlog) {
    res.status(201).json(createdBlog);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc Create blog
// @route POST /api/blog
// @access Private/Admin
// exports.createBlog = asyncHandler(async (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Image could not upload",
//       });
//     }

//     const { title, body, categories, tags } = fields;

//     if (!title || !title.length) {
//       return res.status(400).json({
//         error: "title is require",
//       });
//     }

//     if (!body || body.length < 200) {
//       return res.status(400).json({
//         error: "Content is too short",
//       });
//     }

//     if (!categories || categories.length === 0) {
//       return res.status(400).json({
//         error: "At least one category is required",
//       });
//     }

//     if (!tags || tags.length === 0) {
//       return res.status(400).json({
//         error: "At least one tag is required",
//       });
//     }

//     let blog = new Blog();
//     blog.title = title;
//     blog.body = body;
//     blog.exerpt = smartTrim(body, 320, " ", "...");
//     blog.slug = slugify(title).toLowerCase();
//     blog.mtitle = `${title} | ${process.env.APP_NAME}`;
//     blog.mdescription = stripHtml(body.substring(0, 160)).result;
//     blog.postedBy = req.user._id;
//     // categories and tags
//     let arrayOfCategories = categories && categories.split(",");
//     let arrayOfTags = tags && tags.split(",");

//     if (files.photo) {
//       if (files.photo.size > 10000000) {
//         return res.status(400).json({
//           error: "Image should be less then 1mb in size",
//         });
//       }

//       blog.photo.data = fs.readFileSync(files.photo.path);
//       blog.photo.contentType = files.photo.type;
//     }

//     blog.save((err, result) => {
//       if (err) {
//         return res.status(400).json(err);
//       }

//       Blog.findByIdAndUpdate(
//         result._id,
//         { $push: { categories: arrayOfCategories } },
//         { new: true }
//       ).exec((err, result) => {
//         if (err) {
//           return res.status(400).json({
//             error: err,
//           });
//         } else {
//           Blog.findByIdAndUpdate(
//             result._id,
//             { $push: { tags: arrayOfTags } },
//             { new: true }
//           ).exec((err, result) => {
//             if (err) {
//               return res.status(400).json({
//                 error: err,
//               });
//             } else {
//               res.status(201).json(result);
//             }
//           });
//         }
//       });
//     });
//   });
// });

// @desc Get all blogs
// @route GET /api/blog
// @access Admin/Private
exports.getAllBlog = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Blog.countDocuments({ ...keyword });
  const blogs = await Blog.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate("categories", "name slug")
    .populate("postedBy", "name");

  if (blogs) {
    res.status(200).json({ blogs, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @desc Delete blog
// @route DELETE /api/blog/:id
// @access Admin/Private
exports.deleteBlog = asyncHandler(async (req, res) => {
  const deletedBlog = await Blog.findOne({ slug: req.params.slug });

  if (deletedBlog) {
    await deletedBlog.remove();
    res.status(200).json(deletedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc Update blog
// @route PUT /api/blog/:id
// @access Admin/Private
exports.updateBlog = asyncHandler(async (req, res) => {
  // find blog
  Blog.findOne({ slug: req.params.slug }).exec((err, oldBlog) => {
    // handle error (find blog)
    if (err) {
      return res.status(400).json({
        error: "Blog not found",
      });
    }

    // formidable
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      // re-destructure
      const { title, body, status, categories, tags } = fields;

      // validation
      if (!body || body.length < 200) {
        return res.status(400).json({
          error: "Content is too short",
        });
      }

      // check process
      if (title) {
        oldBlog.title = title;
        oldBlog.slug = slugify(title).toLowerCase();
        oldBlog.mtitle = `${title} | ${process.env.APP_NAME}`;
      }

      if (body) {
        oldBlog.body = body;
        oldBlog.exerpt = smartTrim(body, 320, " ", "...");
        oldBlog.mdescription = stripHtml(body.substring(0, 160)).result;
      }

      if (status) {
        oldBlog.status = status;
      }

      if (categories) {
        oldBlog.categories = categories.split(",");
      }

      if (tags) {
        oldBlog.tags = tags.split(",");
      }

      // upload photo

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.status(400).json({
            error: "Image should be less then 1mb in size",
          });
        }

        oldBlog.photo.data = fs.readFileSync(files.photo.path);
        oldBlog.photo.contentType = files.photo.type;
      }

      // update blog
      const updatedBlog = await oldBlog.save();
      if (updatedBlog) {
        return res.status(200).json(updatedBlog);
      } else {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }
    });
  });
});

// @desc Get single blog
// @route GET /api/blog/:id
// @access Public
exports.getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
    .populate("categories", "name slug")
    .populate("tags", "name slug")
    .populate("postedBy", "name");

  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(400);
    throw new Error("Not found");
  }
});

// @desc Get blog photo
// @route GET /api/blog/:slug
// @access Public
exports.getPhoto = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).select("photo");

  if (blog) {
    // res.set("Content-Type", blog.photo.contentType);
    res.contentType(blog.photo.contentType);
    res.status(200).send(blog.photo.data);
  } else {
    res.status(404);
    throw new Error("Photo not found");
  }
});

// @desc Get blog related
// @route POST /api/blog/related
// @access Public
exports.getRelated = asyncHandler(async (req, res) => {
  const { _id, categories, limit } = req.body;
  let blogLimit = limit ? Number(limit) : 3;

  const relatedBlog = await Blog.find({
    status: { $eq: true },
    _id: { $ne: _id },
    categories: { $in: categories },
  })
    .limit(blogLimit)
    .populate("postedBy", "name profile")
    .select("title slug excerpt postedBy createdAt updatedAt");

  if (relatedBlog) {
    res.status(200).json(relatedBlog);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});
