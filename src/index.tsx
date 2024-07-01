import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import AppWrapper from '@/App';

import { store } from '@store/store';

import '@/variables/global/global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>,
);
