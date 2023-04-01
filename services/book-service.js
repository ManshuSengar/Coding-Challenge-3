const Book = require("../models/book-model");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

class BookService {

  async createBook(data){
    const book = await Book.create(data);
    return book;
  }

  async getBook(bookId) {
    const book = await Book.findOne({ _id: bookId });
    return book;
  }
  async getAllBooks() {
    const books = await Book.find({ deleted: false });
    return books;
  }

  async updateBook(bookId, obj) {
    const book = await Book.findByIdAndUpdate({ _id: bookId }, obj, {
      new: true,
    });
    return book;
  }
  async deleteBook(bookId) {
    const book = await Book.findByIdAndUpdate(
      { _id: bookId },
      { deleted: true },
      { new: true }
    );
    return book;
  }

  async userMetrics() {
    const users = await User.find();
    const metrics = [];
    for (const user of users) {
      const totalBooks = await Book.countDocuments({
        owned_by: user._id,
        deleted: false,
      });
      const booksByAuthor = await Book.aggregate([
        { $match: { owned_by: user._id, deleted: false } },
        { $group: { _id: "$author", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);
      const booksByYear = await Book.aggregate([
        { $match: { owned_by: user._id, deleted: false } },
        { $group: { _id: "$publishing_year", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]);
      metrics.push({
        name: user.firstname,
        totalBooks,
        booksByAuthor,
        booksByYear,
      });
    }
    return metrics;
  }
}

module.exports = new BookService();
