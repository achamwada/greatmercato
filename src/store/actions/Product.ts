import { Product, ProductActionTypes } from '../types/Product';

export interface AddToCart {
  type: ProductActionTypes.ADD_TO_CART;
  payload: Product;
}

export interface LoadProducts {
  type: ProductActionTypes.LOAD_ALL_PRODUCTS;
  payload: Array<Product>;
}

export interface RemoveFromCart {
  type: ProductActionTypes.REMOVE_FROM_CART;
  payload: number;
}

export interface MakePayment {
  type: ProductActionTypes.MAKE_PAYMENT;
  payload: Array<number>;
}

export interface LikeProduct {
  type: ProductActionTypes.LIKE_PRODUCT;
  payload: number;
}

export interface GetSingleProduct {
  type: ProductActionTypes.GET_SINGLE_PRODUCT;
  payload: number;
}
export interface GetCartProducts {
  type: ProductActionTypes.LOAD_CART_PRODUCTS;
}

export interface ClearCart {
  type: ProductActionTypes.CLEAR_CART;
}

export type ProductActions =
  | AddToCart
  | LoadProducts
  | RemoveFromCart
  | MakePayment
  | LikeProduct
  | GetSingleProduct
  | GetCartProducts
  | ClearCart;
