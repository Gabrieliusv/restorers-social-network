const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  about: { type: String, required: true },
  degree: { type: String, required: true },
  restorationCategory: { type: String, required: true },
  experience: { type: String, required: true },
  city: { type: String, required: true },
  profileImg: { type: Object, required: true },
  phoneNum: { type: String, required: true },
  email: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
