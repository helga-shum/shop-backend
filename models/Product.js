import mongoose from 'mongoose';
const ProductSchems = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    order_number: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    measures: {
      type: Array,
      required: true,
    },
    procent: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.model('Product', ProductSchems);
