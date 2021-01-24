const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Book = require("./models/book");
const mongoose = require("mongoose");
const book = require("./models/book");
require("dotenv").config();

const port = process.env.port || process.env.PORT || 3007;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ strict: true }));

app.use(cors());

mongoose.connect(
  `mongodb+srv://besnik:${process.env.MONGODB_INSTANCE_PASSWORD}@devconnector.zlxhv.mongodb.net/${process.env.MONGODB_INSTANCE_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("/api/v1/books", async (req, res) => {
  const books = await Book.find().skip(0).limit(5);
  res.status(200).json({
    books,
  });
});

app.get("/api/v1/book/:id", async (req, res) => {
  const { id } = req.params || {};
  const book = await Book.findById(id);
  console.log(book);
  if (!book) {
    res.status(200).send("This book doesn't exist in the database");
  }
  res.status(200).json(book);
});

app.put("/api/v1/book/:id", async (req, res) => {
  const { id } = req.params || {};
  const { title = "", ISBN = "", coverImage, number_of_pages } = req.body || {};
  console.log(number_of_pages);
  const updateResponse = await book.updateOne(
    { _id: id },
    { $set: { number_of_pages } }
  );
  console.log(updateResponse);
  res.json(updateResponse);
});

app.post("/api/v1/book", async (req, res) => {
  const {
    title = "",
    author = "",
    genre = "",
    ISBN = "",
    publications = [],
    coverImage = "",
    numberOfPages = 0,
  } = req.body || {};
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    ISBN,
    title,
    author,
    genre,
    publications,
    cover_image: coverImage,
    numberOfPages,
  });
  try {
    const result = await book.save();
    res.send(`Book: ${result}`);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/v1/book/:id", async (req, res) => {
  try {
    const { id } = req.params || {};
    const bookDeleteResponse = await book.remove({ _id: id });
    res.json(bookDeleteResponse);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => `Listening on port ${port}`);
