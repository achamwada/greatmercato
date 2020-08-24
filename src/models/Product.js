import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  img: String,
  title: String,
  description: String,
  price: Number,
  brand: String,
  size: Number,
  total_available: Number,
  seller: String,
  date_created: {
    type: Date,
    default: Date.now()
  },
  amount: {
    type: Number,
    default: 1
  }
});

export default mongoose.models.Product ||
  mongoose.model('product', ProductSchema);
