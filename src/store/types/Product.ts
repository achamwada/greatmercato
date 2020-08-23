export enum ProductActionTypes {
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  ADD_TO_CART = 'ADD_TO_CART',
  LOAD_ALL_PRODUCTS = 'LOAD_ALL_PRODUCTS',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  MAKE_PAYMENT = 'MAKE_PAYMENT',
  LIKE_PRODUCT = 'LIKE_PRODUCT',
  GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT',
  LOAD_CART_PRODUCTS = 'LOAD_CART_PRODUCTS',
  CLEAR_CART = 'CLEAR_CART'
}

export enum EndPoints {
  PRODUCT_LIST = '/api/products/'
}

export interface Product {
  _id: string;
  img: string;
  title: string;
  description: string;
  price: number;
  size: string;
  brand: string;
  date: Date;
  seller: string;
  sold: boolean;
  total_available: number;
  amount: number;
}
