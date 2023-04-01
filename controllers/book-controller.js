const Book = require("../models/book-model");
const bookService = require("../services/book-service");

class BookController {
  async createBook(req, res) {
    const { title, author, owned_by, publishing_year } = req.body;
    if (!title || !author || !owned_by || !publishing_year) {
      res.status(400).json("Please Enter all the Feilds");
    }
    const bookExists = await Book.findOne({ title, author, deleted: false });
    if (bookExists) {
      res.status(400).json("Book already exists");
    }
    try {
      const book = await bookService.createBook({
        title,
        author,
        owned_by,
        publishing_year,
      });
      if (book) {
        res.status(201).json({
          _id: book._id,
          title: book.title,
          author: book.author,
          owned_by: book.owned_by,
          publishing_year: book.publishing_year,
        });
      } else {
        res.status(400).json("Book not found");
      }
    } catch (err) {
      res.status(400).json("Error");
    }
  }

  async index(req, res) {
    const books = await bookService.getAllBooks();
    return res.json(books);
  }

  async show(req, res) {
    const book = await bookService.getBook(req.params.bookId);
    return res.json(book);
  }

  async update(req, res) {
    try {
      const book = await bookService.updateBook(req.params.bookId, req.body);
      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async delete(req, res) {
    try {
      const book = await bookService.deleteBook(req.params.bookId);
      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async userMetric(req, res) {
    try {
      const book = await bookService.userMetrics();
      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
module.exports = new BookController();
