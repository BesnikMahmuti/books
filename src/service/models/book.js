const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ISBN: String,
  title: String,
  author: String,
  description: String,
  genre: String,
  publications: Array,
  cover_image: String,
  number_of_pages: Number,
});

module.exports = mongoose.model("Book", bookSchema);
