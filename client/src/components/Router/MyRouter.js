import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signin from 'components/Login/Signin';
import Signup from 'components/Login/Signup';
import Screen from 'components/Screen';
import Loading from 'components/UI/Loading';
import Socket from 'components/Socket';
import { verifyAuth } from 'actions/auth';

export default function MyRouter() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute isAuth={user !== null} exact path='/' >
          <Socket>
            <Screen />
          </Socket>
        </PrivateRoute>
        <PublicRoute isAuth={user !== null} exact path='/signin' >
          <Signin />
        </PublicRoute>
        <PublicRoute isAuth={user !== null} exact path='/signup' >
          <Signup />
        </PublicRoute>
      </Switch>
    </BrowserRouter>
  );
}