import mongoose, { Schema, Document } from "mongoose";

export interface IBorrowRequest extends Document {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;

  status: "pending" | "approved" | "rejected";

  requestDate: Date;
  approvedDate?: Date;
  dueDate?: Date;
}

const BorrowRequestSchema = new Schema<IBorrowRequest>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    requestDate: {
      type: Date,
      default: Date.now,
    },

    approvedDate: Date,

    dueDate: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BorrowRequest ||
  mongoose.model<IBorrowRequest>(
    "BorrowRequest",
    BorrowRequestSchema
  );