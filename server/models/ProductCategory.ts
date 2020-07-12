import { Schema, model } from 'mongoose';
import { IProductCategory } from './types';

const ProductCategorySchema = new Schema(
  {
    title: String,
    description: String,
    slug: String,
    hero: String,
  },
  { timestamps: true },
);

ProductCategorySchema.on('save', function(this: IProductCategory, next: any) {
  this.slug = this.title.toLowerCase().replace(' ', '-');
  console.log('this.description', this.slug);
  next();
});

export default model('Product_Category', ProductCategorySchema);
