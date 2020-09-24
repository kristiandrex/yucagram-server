import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropsTypes from 'prop-types';

export default function PublicRoute({ isAuth, children, ...rest }) {
  if (isAuth)
    return <Redirect to='/' />;

  return (
    <Route {...rest}>
      {children}
    </Route>
  );
}

PublicRoute.propTypes = {
  isAuth: PropsTypes.bool.isRequired,
  path: PropsTypes.string.isRequired,
  exact: PropsTypes.bool,
  children: PropsTypes.element.isRequired
};