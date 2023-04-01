const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bookSchema = mongoose.Schema(
    {
      title: { type: "String", required: true },
      author:{ type: "String", required: true },
      publishing_year:{type:Number,required:true},
      owned_by :{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
      deleted:{ type: Boolean, default: false },
    },
    { timestaps: true }
  );
  const Book = mongoose.model("Book", bookSchema);

  
module.exports = Book;