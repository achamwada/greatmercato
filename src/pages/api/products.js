const Products = require('../../models/Product');
const DBconn = require('../../config/db');
DBconn();
/**
|--------------------------------------------------
| Public Route GET : lists all products in store
|--------------------------------------------------
*/
const handler = async (req, res) => {
  try {
    let products = await Products.find({});
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(301).json({ msg: 'server error', error: error.msg });
  }
};

module.exports = handler;
