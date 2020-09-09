import React from 'react';
import ItemListUsers from './ItemListUsers';
import PropTypes from 'prop-types'

export default function ListUsers({ users }) {
	return (
		<div className='list-users'>
			<div className='p-2 border-bottom font-weight-bold text-center'>Usuarios</div>
			{users.map(user => <ItemListUsers user={user} key={user._id} />)}
		</div>
	);
}

ListUsers.propTypes = {
	users: PropTypes.array.isRequired
}