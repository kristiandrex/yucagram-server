import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Socket from './Socket';

export default function Root() {
  return (
    <Provider store={store}>
      <Socket/>
    </Provider>
  );
}