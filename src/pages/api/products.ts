import { NextApiRequest, NextApiResponse } from 'next';
import Products from '../../models/Product';
import dbConnect from '../../config/db';
dbConnect();
/**
|--------------------------------------------------
| Public Route GET : lists all products in store
|--------------------------------------------------
*/
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let products = await Products.find({});
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(301).json({ msg: 'server error', error: error.msg });
  }
};

module.exports = handler;
