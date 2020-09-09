import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from '../Profile/ProfileCard';
import CustomDropdown from '../UI/Dropdown';
import SearchBar from './SearchBar';
import ListChats from '../Chats/ListChats';
import ListUsers from '../Users/ListUsers';
import { signout } from '../../redux/actions/auth';

const LateralSectionStyled = styled.div`
	background: #fff;
	display: 'block';
	height: 100%;
	overflow-y: auto;

	@media (max-width: 576px) {
		border: none !important;
		display: ${({ hideMobile }) => hideMobile ? 'none' : 'block'};
	}
`;

function Lateral() {
	const state = useSelector((state) => state);
	const user = state.auth.user;
	const { current, collection } = state.chats;
	const { searching, users, chats } = state.results;

	const showUsers = useMemo(() => (searching && users.length > 0), [searching, users.length]);
	const hideMobile = useMemo(() => ((current.user !== null || current.chat) !== null), [current]);

	const dispatch = useDispatch();
	const handleSignout = () => dispatch(signout());

	return (
		<LateralSectionStyled className='col-lg-3 col-sm-4 col-12 border-right' hideMobile={hideMobile}>
			<ProfileCard avatar={user.avatar} username={user.username}>
				<CustomDropdown
					id={user._id}
					icon={'more_vert'}
					onClick={handleSignout}
					white
				>
					Cerrar sesión
				</CustomDropdown>
			</ProfileCard>
			<SearchBar />
			<ListChats chats={searching ? chats : collection} searching={searching} />
			{showUsers && <ListUsers users={users} />}
		</LateralSectionStyled>
	);
}

export default memo(Lateral);