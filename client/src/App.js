import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import MyRouter from 'components/Router/MyRouter';
import store from './store';

const GlobalStyled = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  .material-icons {
    vertical-align: middle !important;
  }

  .dropdown-menu {
    text-align: center !important;
  }
`;

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyled />
      <MyRouter />
    </Provider>
  );
} 