import React, { memo, MouseEvent, useState, useCallback } from 'react';
import ProfileCard from './ProfileCard';
import { User, State, Current, DispatchI } from '../react-app-env';
import styled from 'styled-components';
import Chats from './Chats';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  current: Current
}

const LateralSectionStyled = styled.div<Props>`
  height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-rows: 65px 55px auto;
  background: #fff;

  @media (max-width: 576px) {
    border: none !important;
    display: ${props => props.current.user !== null || props.current.chat !== null ? 'none' : 'grid'};
  }

  .dropdown .dropdown-menu {
    right: 0.5rem;
    left: unset;

    .dropdown-item {
      cursor: pointer;
      text-align: center;
    }
  }
`;

function LateralSection() {
  const user = useSelector<State, User>((state) => state.user as User);
  const current = useSelector<State, Current>((state) => state.current);
  const dispatch = useDispatch<DispatchI>();

  const [state, setState] = useState<boolean>(false);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target: HTMLElement = event.target as HTMLElement;
    const classList: DOMTokenList = target.classList;

    if (state) {

      if (!classList.contains('dropdown-menu') && !classList.contains('dropdown-item')) {
        setState(false);
      }

    }
  };

  const handleToggle = useCallback(() => {
    setState(!state)
  }, [state])

  const handleSignout = useCallback(() => {
    dispatch({ type: 'SIGNOUT' })
  }, [dispatch])

  return (
    <LateralSectionStyled
      className='col-lg-3 col-sm-4 col-12 border-right'
      current={current}
      onClick={handleClick}
    >
      <div className="dropdown">
        <ProfileCard user={user} onClick={handleToggle} />
        <div className={`dropdown-menu shadow ${state ? 'd-block' : 'd-none'}`}>
          <div className="dropdown-item" onClick={handleSignout}>Cerrar sesión</div>
        </div>
      </div>

      <Chats />
    </LateralSectionStyled>
  );
}

export default memo(LateralSection);
