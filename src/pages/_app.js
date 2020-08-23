import App from 'next/app';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import React from 'react';
import Header from '../components/layout/Header';
import store from '../store/Store';

import AuthContextState from '../Context/authentication/AuthContextState';
const theme = createMuiTheme({
  palette: {
    primary: { main: '#017b42' },
    secondary: { main: '#bf072b' },
  },
});

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const appProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    console.log('appProps ===> ALEX', appProps);
    return { appProps: appProps };
  }

  render() {
    const { Component, appProps } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* <AuthContextState> */}
          <Header>
            <Grid container direction="row" style={{ height: '82vh' }}>
              <Component {...appProps} />
            </Grid>
          </Header>
          {/* </AuthContextState> */}
        </ThemeProvider>
      </Provider>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
