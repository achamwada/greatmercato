import { CartActions } from '../actions/Cart';
import { CartActionTypes } from '../types/Cart';
import { Product } from '../types/Product';

const initialProducts: Array<Product> = [];
const cartReducer = (initialState = initialProducts, action: CartActions): Array<Product> => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART: {
      return [...initialState, action.payload];
    }

    case CartActionTypes.REMOVE_FROM_CART: {
      return initialState.filter(product => product._id !== action.payload);
    }

    case CartActionTypes.MULTIPLY_PRODUCT: {
      // filtering only the selected product and giving it the new selected amount
      // eslint-disable-next-line
      const multiplyingProduct = initialState.filter(product => {
        if (product._id === action.payload.productID) {
          product.amount = action.payload.multiple;
        }
      });
      return [...initialState, ...multiplyingProduct];
    }

    case CartActionTypes.LOAD_CART_PRODUCTS: {
      return [...initialState];
    }

    case CartActionTypes.CLEAR_CART: {
      return [];
    }

    default: {
      return initialState;
    }
  }
};

export default cartReducer;
