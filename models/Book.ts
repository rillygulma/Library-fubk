import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  isbn: string;

  totalCopies: number;
  availableCopies: number;

  coverImage: string;
}

const BookSchema = new Schema(
  {
    title: String,
    author: String,
    isbn: String,

    totalCopies: {
      type: Number,
      default: 1,
    },

    availableCopies: {
      type: Number,
      default: 1,
    },

    coverImage: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Book ||
  mongoose.model("Book", BookSchema);