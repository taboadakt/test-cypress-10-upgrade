import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'theme-ui';
import { theme } from './theme';
import App from './App';
import store from './state/store';
import './assets/_fonts.css';
import { DoppioProvider } from '@odekoteam/doppio';

render(
  <React.StrictMode>
    <Provider store={store}>
      <DoppioProvider applicationName="example-app">
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </DoppioProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
