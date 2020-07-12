import fs from 'fs';
import path from 'path';
import faker from 'faker';
import DBConn from './DBConn';
import {
  IProductImage,
  IReview,
  IProduct,
  IProductCategory,
  ISeller,
} from '../models/types';
import Review from '../models/Review';
import ProductImage from '../models/ProductImage';
import Product from '../models/Product';
import Seller from '../models/Seller';
import ProductCategory from '../models/ProductCategory';
DBConn();
class Seeder {
  reviewIDs: string[] = [];
  productImageIDs: string[] = [];
  productIDs: string[] = [];
  productCategoryIDs: string[] = [];
  sellerIDs: string[] = [];
  constructor() {
    this.run();
  }

  async run() {
    await this.generateReviews();
    await this.generateProductImages();
    await this.generateProductCategory();
    await this.generateSellers();
    await this.generateProduct();
    console.log('Finished');
  }
  generateReviews = async () => {
    const reviews = [...new Array(70)].map(
      (): IReview => {
        return {
          avatar: faker.internet.avatar(),
          description: faker.lorem.sentences(Math.floor(Math.random() * 10)),
          title: faker.lorem.sentence(),
        };
      },
    );
    try {
      const newReviews = await Review.insertMany(reviews);
      this.reviewIDs = newReviews.map(review => review._id);
    } catch ({ message }) {
      console.log('Error in bulk insert Reviews', message);
    }
  };

  generateProductImages = async () => {
    const productImages = [...new Array(50)].map(
      (): IProductImage => {
        return {
          sm_url: faker.image.food(100),
          md_url: faker.image.food(200),
          lg_url: faker.image.food(250),
          title: faker.lorem.sentence(),
        };
      },
    );
    try {
      const newProductImages = await ProductImage.insertMany(productImages);
      this.productImageIDs = newProductImages.map(image => image._id);
    } catch ({ message }) {
      console.log('Error in bulk insert ProductImage', message);
    }
  };

  generateProduct = async () => {
    const products = [...new Array(5)].map(
      (): IProduct => {
        return {
          title: faker.lorem.sentence(),
          hero_img: faker.lorem.sentence(),
          price: Number(faker.finance.amount(100)),
          description: faker.lorem.sentence(),
          excerpt: faker.lorem.sentence(),
          sku: faker.lorem.sentence(),
          seller: this.sellerIDs[
            Math.floor(Math.random() * this.sellerIDs.length)
          ],
          instock: faker.random.boolean(),
          rating: faker.random.number(5),
          vat: Number(faker.finance.amount(100)),
          quantity: faker.random.number(10),
          return_policy: faker.lorem.sentence(),
          condition: faker.lorem.sentence(),
          location: faker.lorem.sentence(),
          click_and_collect: faker.random.boolean(),
          product_category: this.productCategoryIDs[
            Math.floor(Math.random() * this.productCategoryIDs.length)
          ],
          reviews: this.reviewIDs.slice(
            Math.floor(Math.random() * this.reviewIDs.length),
            this.reviewIDs.length - 1,
          ),
          gallery: this.productImageIDs.slice(
            Math.floor(Math.random() * this.productImageIDs.length),
            this.productImageIDs.length - 1,
          ),
        };
      },
    );
    try {
      const newProducts = await Product.insertMany(products);
      this.productIDs = newProducts.map(product => product._id);
    } catch ({ message }) {
      console.log('Error in bulk insert Product', message);
    }
  };

  generateProductCategory = async () => {
    const productCategories = [...new Array(10)].map(
      (): IProductCategory => {
        return {
          description: faker.lorem.paragraph(),
          hero: faker.image.fashion(),
          title: faker.lorem.sentence(),
        };
      },
    );
    try {
      const newProductCategories = await ProductCategory.insertMany(
        productCategories,
      );
      this.productCategoryIDs = newProductCategories.map(
        category => category._id,
      );
    } catch ({ message }) {
      console.log('Error in bulk insert ProductCategory', message);
    }
  };

  generateSellers = async () => {
    const sellers = [...new Array(30)].map(
      (): ISeller => {
        return {
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          title: faker.lorem.sentence(),
          phonenumber: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          account_type: faker.random.word(),
          provider: ['Google', 'Facebook', 'Normal'][
            Math.floor(Math.random() * 4)
          ],
        };
      },
    );
    try {
      const newSellers = await Seller.insertMany(sellers);
      this.sellerIDs = newSellers.map(seller => seller._id);
    } catch ({ message }) {
      console.log('Error in bulk insert Seller', message);
    }
  };

  generateLogFile(data: any[], filename: string) {
    fs.writeFile(
      path.resolve(process.cwd(), filename),
      JSON.stringify(data),
      err => {
        if (err) {
          console.log('Failed to create file', err);
        }
      },
    );
  }
}

const sd = new Seeder();
