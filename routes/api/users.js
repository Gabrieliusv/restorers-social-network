const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route Post api/users
//@desc Register user
//@access Public

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("aboutMe", "About me is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, aboutMe } = req.body;
    const userStatus = "inactive";

    try {
      let checkName = await User.findOne({ name });
      let checkEmail = await User.findOne({ email });

      if (checkName) {
        return res.status(400).json({
          errors: [{ msg: "User with this name is already registered" }]
        });
      }

      if (checkEmail) {
        return res.status(400).json({
          errors: [{ msg: "User with this email is already registered" }]
        });
      }

      user = new User({
        name,
        email,
        password,
        aboutMe,
        userStatus
      });

      //Encrypt password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.json({ msg: "Registracija sėkminga." });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route Get api/users/inactive
//@desc Get all not activated users
//@access Private/Admin
router.get("/inactive", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.userStatus === "admin") {
      const allInactive = await User.find({ userStatus: "inactive" }).select(
        "-password"
      );
      res.json(allInactive);
    } else {
      res.status(403).send("User not authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/users/activate
//@desc Activate user
//@access Private/Admin
router.put("/activate/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.userStatus === "admin") {
      await User.findByIdAndUpdate(req.params.id, {
        userStatus: "active"
      });
      res.json("activated");
    } else {
      res.status(403).send("User not authorized");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/users/:id
//@desc Delete user
//@access Private/Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user.userStatus === "admin") {
      await User.findByIdAndDelete(req.params.id);
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
