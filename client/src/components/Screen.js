import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Lateral from './Lateral/Lateral';
import CurrentLayout from './Current/CurrentLayout';
import ProfileChooser from './Profile/ProfileChooser';
import Socket from './Socket';

const StyledSession = styled.div`
  .no-outline {
	outline: none;
  }

  .dropdown-toggle {
	&::after {
	  display: none;
	}
  }

  .dropdown {
	.dropdown-toggle {
		outline: none;
		box-shadow: none;
		color: #212529;
	}
  }
`;
export default function Screen() {
	const user = useSelector((state) => state.auth.user);

	if (user.new) {
		return <ProfileChooser user={user} />;
	}

	return (
		<Socket>
			<StyledSession className='row no-gutters h-100'>
				<Lateral />
				<CurrentLayout />
			</StyledSession>
		</Socket>
	);
}
