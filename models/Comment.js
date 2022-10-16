import mongoose from 'mongoose';
const CommentSchems = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
    },
    ItemId: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model('Comment', CommentSchems);
