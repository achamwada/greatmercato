import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema(
  {
    title: String,
    description: String,
    avatar: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
    },
  },
  {
    timestamps: true,
  },
);

export default model('review', ReviewSchema);
