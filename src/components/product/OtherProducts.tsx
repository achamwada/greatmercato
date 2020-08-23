import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import ProductCard from './ProductCard';
interface Props {
  productID: string;
}
const OtherProducts: React.FC<Props> = ({ productID }) => {
  const products = useSelector((state: AppState) => state.product);
  const productsInCart = useSelector((state: AppState) => state.cart);

  const idsInCart = productsInCart.map(product => product._id);

  const filteredProductList = products.filter(product => product._id !== productID && !idsInCart.includes(product._id));
  return (
    <React.Fragment>
      {filteredProductList.length > 0 ? (
        <>
          <Typography variant="h4" component="p" style={{ textAlign: 'center', margin: '1em' }}>
            Other products
          </Typography>
          <Grid container>
            {filteredProductList.map(product => (
              <Grid key={product._id} item xs={12} sm={6} md={3} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default OtherProducts;
