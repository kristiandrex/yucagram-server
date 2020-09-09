import React, { memo, useMemo } from 'react';
import ItemListChats from './ItemListChats';
import PropTypes from 'prop-types'

function ListChats({ chats, searching }) {
	const show = useMemo(() => (searching && chats.length > 0), [searching, chats.length]);

	return (
		<div className='list-chats'>
			{show && <div className='p-2 border-bottom font-weight-bold text-center'>Chats</div>}
			{
				chats.map((chat, index) => (
					<ItemListChats
						key={chat._id}
						chat={chat}
						index={index}
					/>
				))
			}
		</div>
	);
}

ListChats.propTypes = {
	chats: PropTypes.array.isRequired,
	searching: PropTypes.bool.isRequired
}

export default memo(ListChats);
