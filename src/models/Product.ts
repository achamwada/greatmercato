import mongoose from 'mongoose';
const schema = mongoose.Schema;

const ProductSchema = schema({
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
    default: Date.now(),
  },
  amount: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('product', ProductSchema);
