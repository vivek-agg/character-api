// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('app'),
);
