import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Signin from '../components/Login/Signin';
import Signup from '../components/Login/Signup';
import Screen from '../components/Screen';
import Loading from '../components/UI/Loading';
import { verifyAuth } from '../redux/actions/auth';

export default function Router() {
	const { user, loading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(verifyAuth());
	}, [dispatch]);

	if (loading) {
		return <Loading />
	}

	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute isAuth={user !== null} exact path='/' >
					<Screen />
				</PrivateRoute>
				<PublicRoute isAuth={user !== null} exact path='/signin' >
					<Signin />
				</PublicRoute>
				<PublicRoute isAuth={user !== null} exact path='/signup' >
					<Signup />
				</PublicRoute>
			</Switch>
		</BrowserRouter>
	)
}