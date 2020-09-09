import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropsTypes from 'prop-types'

export default function PrivateRoute({ isAuth, children, ...rest }) {
	if (!isAuth)
		return <Redirect to='/signin' />

	return (
		<Route {...rest}>
			{children}
		</Route>
	)
}

PrivateRoute.propTypes = {
	isAuth: PropsTypes.bool.isRequired,
	path: PropsTypes.string.isRequired,
	exact: PropsTypes.bool,
	children: PropsTypes.element.isRequired
}