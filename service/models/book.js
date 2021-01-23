const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: String,
  genre: String,
  publications: Array,
  cover_image: String,
  number_of_pages: Number,
});

module.exports = mongoose.model("Book", bookSchema);
