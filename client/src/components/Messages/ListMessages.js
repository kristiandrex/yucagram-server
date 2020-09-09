import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MessagePill from './MessagePill';
import PropTypes from 'prop-types'

const StyledListMessages = styled.div`
	.message-row {
		padding-bottom: 8px;
	}

	.message-row:first-child {
		padding-top: 8px;
	}
`;

export default function ListMessages({ messages }) {
	const user = useSelector((state) => state.auth.user);
	const listRef = useRef(null);

	useEffect(() => {
		const scrollHeight = listRef.current?.scrollHeight;
		const clientHeight = listRef.current?.clientHeight;
		listRef.current?.scrollTo(0, scrollHeight - clientHeight);
	}, []);

	useEffect(() => {
		const current = listRef.current;

		if (current === null) {
			return;
		}

		const children = current.children;
		const scrollHeight = current.scrollHeight;
		const clientHeight = current.clientHeight;

		if (children.length === 0 || scrollHeight === clientHeight) {
			return;
		}

		const scrollTop = current.scrollTop;
		const lastChildren = children[children.length - 1];
		const previousChildrenHeigth = lastChildren.previousElementSibling?.clientHeight || 0;

		if (scrollTop >= (scrollHeight - clientHeight - previousChildrenHeigth)) {
			current.scrollTo(0, scrollHeight - clientHeight);
		}
	}, [messages]);

	return (
		<StyledListMessages className='list-messages px-2' ref={listRef}>
			{
				messages.map(message => (
					<MessagePill
						key={message._id}
						message={message}
						own={user._id === message.from}
					/>
				))
			}
		</StyledListMessages>
	);
}

ListMessages.propTypes = {
	messages: PropTypes.array.isRequired
}