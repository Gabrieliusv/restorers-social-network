const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  author: { type: Object, required: true },
  subject: { type: String, required: true },
  about: { type: String, required: true },
  img: { type: Object, required: true },
  blogText: { type: Object, required: true },
  blogImages: { type: Array },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = Blog = mongoose.model("blog", BlogSchema);
