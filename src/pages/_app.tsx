import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import type { AppProps, AppContext } from 'next/app';
import App from 'next/app';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import React from 'react';
import Header from '../components/layout/Header';
import store from '../store/Store';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthContextState from '../Context/authentication/AuthContextState';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const theme = createMuiTheme({
  palette: {
    primary: { main: '#017b42' },
    secondary: { main: '#bf072b' }
  }
});

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Great Mercato</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <AuthContextState> */}
          <Header>
            <Grid container direction="row" style={{ height: '82vh' }}>
              <Component {...pageProps} />
            </Grid>
          </Header>
          {/* </AuthContextState> */}
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};
