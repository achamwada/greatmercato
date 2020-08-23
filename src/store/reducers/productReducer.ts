import { ProductActions } from '../actions/Product';
import { Product, ProductActionTypes } from '../types/Product';

const initialProducts: Array<Product> = [];
const productReducer = (
  initialState = initialProducts,
  action: ProductActions
): Array<Product> => {
  switch (action.type) {
    case ProductActionTypes.LOAD_ALL_PRODUCTS: {
      return action.payload;
    }

    default: {
      return initialState;
    }
  }
};

export default productReducer;
