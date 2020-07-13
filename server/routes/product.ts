import express, { Router, Request, Response } from 'express';
import Product from '../models/Product';
const router: Router = express.Router();
/**
 * Method GET List all products
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find().limit(50);
    res.status(200).json({
      products,
    });
  } catch ({ message }) {
    console.log('error is getting products', message);
  }
});
export default router;
