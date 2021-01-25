const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Book = require("./models/book");
const mongoose = require("mongoose");
const book = require("./models/book");
const requestParamsValidator = require("./utils/validation")
  .RequestParamsValidator;
const errorHandler = require("./utils/validation").ErrorHandler;
const requestBodyValidator = require("./utils/validation").RequestBodyValidator;
const succesHandler = require("./utils/validation").SuccesHandler;
const bookPropertiesValidator = require("./utils/validation")
  .BookPropertiesValidator;
  const fieldTypeValidator = require("./utils/validation")
  .FieldTypeValidator;
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerOptions = require("./swaggerConfig").swaggerOptions;
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

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/api/v1/books", async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query || {};
    if((Number(skip) === 0 || Number(skip) > 0) && (Number(skip) === 0 || Number(skip) > 0)) {
      const books = await Book.find().skip(Number(skip)).limit(Number(limit));
      return res.status(200).json({
        books,
      });
    }
    const books = await Book.find();
    return res.status(200).json({
      books,
    });
  } catch (error) {
    res.status(400).json(errorHandler("Failed to get the books"));
  }
});

app.get("/api/v1/book/:id", async (req, res) => {
  const { id } = req.params || {};

  if (requestParamsValidator(req.params)) {
    res.status(400).json(requestParamsValidator(req.params));
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      res.status(200).send("This book doesn't exist in the database");
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(400)
      .json(errorHandler("This book doesn't exist in the database"));
  }
});

app.put("/api/v1/book/:id", async (req, res) => {
  const { id } = req.params || {};
  const bodyParameters = req.body || {};
  const updateQuery = {};

  if (requestParamsValidator(req.params)) {
    return res.status(400).json(requestParamsValidator(req.params));
  }

  if (requestBodyValidator(req.body)) {
    return res.status(400).json(requestBodyValidator(req.body));
  }

  if (bookPropertiesValidator(req.body)) {
    return res.status(400).json(bookPropertiesValidator(req.body));
  }

  if (bodyParameters) {
    Object.entries(bodyParameters).forEach(([key, value]) => {
      updateQuery[`${key}`] = value;
    });
  }

  try {
    const updateResponse = await book.updateOne(
      { _id: id },
      { $set: updateQuery }
    );

    if (updateResponse) {
      res
        .status(200)
        .json(succesHandler("update", "Book updated successfully"));
    }
  } catch (error) {
    res.status(400).json(errorHandler("Failed to update the book"));
  }
});

app.post("/api/v1/book", async (req, res) => {
  const {
    title = "",
    author = "",
    genre = "",
    ISBN = "",
    publications = [],
    coverImage = "",
    description,
    numberOfPages = 0,
  } = req.body || {};
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    ISBN,
    title,
    author,
    genre,
    publications,
    description,
    cover_image: coverImage,
    number_of_pages: numberOfPages,
  });
  try {
    const result = await book.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(errorHandler("Failed to create the book"));
  }
});

app.delete("/api/v1/book/:id", async (req, res) => {
  try {
    const { id } = req.params || {};
    const book = await Book.findById(id);
    await book.remove({ _id: id });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json(errorHandler("Book was not deleted successfully"));
  }
});

app.listen(port, () => `Listening on port ${port}`);
