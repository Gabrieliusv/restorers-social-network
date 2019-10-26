const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const upload = require('../../middleware/upload');
const fs = require('fs');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route POST api/profile/picture
//@desc Upload user profile picture
//@access Private
router.post('/picture', auth, upload, async (req, res) => {
  console.log(req.file);
  if (req.fileValidationError) {
    return res.status(400).json({ errors: req.fileValidationError });
  }

  if (!req.file) {
    return res.send('Please upload a file');
  }

  try {
    return res.json({
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route POST api/profile
//@desc Create or update user profile
//@access Private
router.post(
  '/',
  [
    auth,
    upload,
    [
      check('firstName', 'First name is required')
        .not()
        .isEmpty(),
      check('lastName', 'Last name is required')
        .not()
        .isEmpty(),
      check('specialization', 'Specialization is required')
        .not()
        .isEmpty(),
      check('about', 'About me is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('restorationCategory', 'Restoration category is required')
        .not()
        .isEmpty(),
      check('experience', 'Experience is required')
        .not()
        .isEmpty(),
      check('city', 'City is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.fileValidationError) {
      return res
        .status(400)
        .json({ errors: [{ msg: req.fileValidationError }] });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Please upload a profile image' }] });
    }

    const {
      firstName,
      lastName,
      specialization,
      about,
      degree,
      restorationCategory,
      experience,
      city
    } = req.body;

    // Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.firstName = firstName;
    profileFields.lastName = lastName;
    profileFields.specialization = specialization;
    profileFields.about = about;
    profileFields.degree = degree;
    profileFields.restorationCategory = restorationCategory;
    profileFields.experience = experience;
    profileFields.city = city;
    profileFields.profileImg = {
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //Update profile
      if (profile) {
        //delete old profile image

        if (process.env.NODE_ENV === 'production') {
          fs.unlink(
            `./client/build/uploads/${profile.profileImg.fileName}`,
            err => {
              if (err) throw err;
              console.log(`${profile.profileImg.filePath} was deleted`);
            }
          );
        } else {
          fs.unlink(
            `./client/public/uploads/${profile.profileImg.fileName}`,
            err => {
              if (err) throw err;
              console.log(`${profile.profileImg.filePath} was deleted`);
            }
          );
        }

        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true }
        );

        return res.json(profile);
      }

      //Create Profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route DELETE api/profile
//@desc Delete current users profile
//@access Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
