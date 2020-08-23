import { Schema, model } from 'mongoose';

const SellerSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    title: String,
    phonenumber: String,
    email: String,
    password: String,
    account_type: String,
    provider: String,
  },
  {
    timestamps: true,
  },
);

export default model('seller', SellerSchema);
