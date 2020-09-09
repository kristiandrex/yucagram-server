import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  align-items: center;
  color: #fff;

  .avatar {
    border-radius: 50%;
    width: 47px;
    height: 47px;
  }

  .btn-options {
    cursor: pointer;
    outline: none;
  }
`;

function ProfileCard({ children, username, avatar }) {
	return (
		<StyledDiv className='p-2 bg-primary profile-card'>
			<div className='rounded-circle border'>
				<img
					className='avatar'
					src={avatar}
					alt={`Foto de ${username}`}
				/>
			</div>
			<span className='font-weight-bold'>{username}</span>
			{children}
		</StyledDiv>
	);
}

ProfileCard.propTypes = {
	children: PropTypes.element.isRequired,
	username: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired
}

export default memo(ProfileCard);