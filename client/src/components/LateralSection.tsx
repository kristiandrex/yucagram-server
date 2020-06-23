import React, { memo, useCallback } from 'react';
import ProfileCard from './ProfileCard';
import { User, State, Current, DispatchI } from '../react-app-env';
import styled from 'styled-components';
import Chats from './Chats';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown'

interface StyledProps {
  current: Current
}

const LateralSectionStyled = styled.div<StyledProps>`
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 65px 55px auto;
  background: #fff;

  @media (max-width: 576px) {
    border: none !important;
    display: ${props => props.current.user !== null || props.current.chat !== null ? 'none' : 'grid'};
  }
`;

function LateralSection() {
  const user = useSelector<State, User>((state) => state.user as User);
  const current = useSelector<State, Current>((state) => state.current);

  const dispatch = useDispatch<DispatchI>();

  const handleSignout = useCallback(() => {
    dispatch({ type: 'SIGNOUT' })
  }, [dispatch])

  return (
    <LateralSectionStyled
      className='col-lg-3 col-sm-4 col-12 border-right'
      current={current}
    >
      <ProfileCard user={user}>
        <Dropdown className="no-outline">
          <Dropdown.Toggle
            id={user._id}
            className="text-white"
            variant="link"
          >
            <span className="material-icons">more_vert</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-center">
            <Dropdown.Item onClick={handleSignout}>Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ProfileCard>
      <Chats />
    </LateralSectionStyled>
  );
}

export default memo(LateralSection);
