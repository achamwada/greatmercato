import { Product } from '../types/Product';
import { CartActionTypes } from '../types/Cart';
export interface AddToCart {
  type: CartActionTypes.ADD_TO_CART;
  payload: Product;
}

export interface LoadCartProducts {
  type: CartActionTypes.LOAD_CART_PRODUCTS;
  payload: Array<Product>;
}

export interface RemoveFromCart {
  type: CartActionTypes.REMOVE_FROM_CART;
  payload: string;
}

export interface MultiplyProduct {
  type: CartActionTypes.MULTIPLY_PRODUCT;
  payload: {
    multiple: number;
    productID: string;
  };
}

export interface MakePayment {
  type: CartActionTypes.MAKE_PAYMENT;
  payload: Array<number>;
}

export interface GetCartProducts {
  type: CartActionTypes.LOAD_CART_PRODUCTS;
}

export interface ClearCart {
  type: CartActionTypes.CLEAR_CART;
}

export type CartActions = AddToCart | LoadCartProducts | RemoveFromCart | MakePayment | GetCartProducts | ClearCart | MultiplyProduct;
