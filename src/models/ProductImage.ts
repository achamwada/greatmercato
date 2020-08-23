import { Schema, model } from 'mongoose';
const ProductImageSchema = new Schema({
  title: String,
  lg_url: String,
  md_url: String,
  sm_url: String,
});

export default model('product_image', ProductImageSchema);
