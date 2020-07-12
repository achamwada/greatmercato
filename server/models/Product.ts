import { Schema, model } from 'mongoose';
import Review from './Review';
import ProductImage from './ProductImage';
import Seller from './Seller';
import ProductCategory from './ProductCategory';

const ProductSchema = new Schema(
  {
    title: String,
    hero_img: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
    },
    price: Number,
    description: String,
    excerpt: String,
    sku: String,
    seller: {
      type: Schema.Types.ObjectId,
      ref: Seller,
    },
    instock: Boolean,
    rating: Number,
    vat: Number,
    quantity: Number,
    return_policy: String,
    condition: String,
    location: String,
    click_and_collect: Boolean,
    product_category: {
      type: Schema.Types.ObjectId,
      ref: ProductCategory,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: Review,
      },
    ],
    gallery: [
      {
        type: Schema.Types.ObjectId,
        ref: ProductImage,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model('product', ProductSchema);
