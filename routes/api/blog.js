const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const uploadTemp = require("../../middleware/uploadTemp");
const upload = require("../../middleware/upload");
const fs = require("fs");

const Blog = require("../../models/Blog");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//@route Get api/blog
//@desc Get published blog posts
//@access Public
router.get("/", async (req, res) => {
  try {
    const posts = await Blog.find({ status: "published" });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/blog/image
//@desc Upload blog picture
//@access Private
router.post("/image", auth, uploadTemp, async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ errors: [{ msg: req.fileValidationError }] });
  }

  if (!req.file) {
    return res.send("Please upload a file");
  }

  try {
    return res.json({
      fileName: req.file.filename,
      filePath: `/temp/${req.file.filename}`
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route DELETE api/blog/image/:id
//@desc Delete blog picture
//@access Private
router.delete("/image/:id", auth, async (req, res) => {
  try {
    //delete blog image
    if (process.env.NODE_ENV === "production") {
      if (fs.existsSync(`./client/build/temp${req.params.id}`)) {
        fs.unlink(`./client/build/temp/${req.params.id}`, err => {
          if (err) throw err;
        });
      } else {
        return res.status(404).send({ msg: "Image not found" });
      }
    } else {
      if (fs.existsSync(`./client/public/temp/${req.params.id}`)) {
        fs.unlink(`./client/public/temp/${req.params.id}`, err => {
          if (err) throw err;
        });
      } else {
        return res.status(404).send({ msg: "Image not found" });
      }
    }

    return res.json({ msg: "Image Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route POST api/blog
//@desc Create blog post
//@access Private
router.post(
  "/",
  [
    auth,
    upload,
    [
      check("subject", "Subject is required")
        .not()
        .isEmpty(),
      check("about", "Subject description is required")
        .not()
        .isEmpty(),
      check("blogText", "Blog content is required")
        .not()
        .isEmpty(),
      check("blogImages", "Blog images is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Please upload a blog image" }] });
    }

    if (req.fileValidationError) {
      return res
        .status(400)
        .json({ errors: [{ msg: req.fileValidationError }] });
    }

    const { subject, about, blogText, blogImages } = req.body;

    // Build Blog object
    let blogFields = {
      user: req.user.id,
      subject,
      about,
      blogText,
      blogImages: [],
      status: "pending"
    };

    try {
      blogFields.img = {
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
      };

      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Please create Profile first" }] });
      }

      blogFields.author = {
        firstName: profile.firstName,
        lastName: profile.lastName
      };

      const img = JSON.parse(blogImages);

      //Moving temporary images to /uploads
      if (img.length > 0) {
        img.forEach(image => {
          if (process.env.NODE_ENV === "production") {
            if (fs.existsSync(`./client/build/temp/${image.fileName}`)) {
              fs.rename(
                `./client/build/temp/${image.fileName}`,
                `./client/build/uploads/${image.fileName}`,
                err => {
                  if (err) throw err;
                }
              );

              blogFields.blogImages.push({
                fileName: image.fileName,
                filePath: `/uploads/${image.fileName}`
              });
            }
          } else {
            if (fs.existsSync(`./client/public/temp/${image.fileName}`)) {
              fs.rename(
                `./client/public/temp/${image.fileName}`,
                `./client/public/uploads/${image.fileName}`,
                err => {
                  if (err) throw err;
                }
              );

              blogFields.blogImages.push({
                fileName: image.fileName,
                filePath: `/uploads/${image.fileName}`
              });
            }
          }
        });
      }

      //Create Blog post
      blog = new Blog(blogFields);

      await blog.save();
      res.json({ msg: "Blog post saved" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server Error");
    }
  }
);

//@route Get api/blog/pending
//@desc Get all new pending blog posts
//@access Private/Admin
router.get("/pending", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.userStatus === "admin") {
      const allNewPosts = await Blog.find({ status: "pending" });
      res.json(allNewPosts);
    } else {
      res.status(403).send("User not authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route PUT api/blog/publish
//@desc Publish Blog post
//@access Private/Admin
router.put("/publish/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.userStatus === "admin") {
      await Blog.findByIdAndUpdate(req.params.id, {
        status: "published"
      });
      res.json("published");
    } else {
      res.status(403).send("User not authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route DELETE api/blog/:id
//@desc Delete Blog post
//@access Private/Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.userStatus === "admin") {
      await Blog.findByIdAndDelete(req.params.id);
      res.json("deleted");
    } else {
      res.status(403).send("User not authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
