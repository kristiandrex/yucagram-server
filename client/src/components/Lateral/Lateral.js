import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, } from 'react-transition-group';
import Profile from 'components/Profile/Profile';
import ProfileBar from 'components/Profile/ProfileBar';
import SearchBar from './SearchBar';
import ListOfChats from 'components/Chats/ListOfChats';
import ListOfUsers from 'components/Users/ListOfUsers';
import ProfileOptions from 'components/Profile/ProfileOptions';
import { openProfile } from 'actions/auth';

const LateralSectionStyled = styled.div`
  background: #fff;
  display: 'block';
  height: 100%;
  overflow-y: auto;
  position: relative;

  .profile-enter {
    left: -100%;
  }

  .profile-enter-active {
    left: 0;
    transition: all .3s ease;
  }

  .profile-exit {
    left: 0;
  }

  .profile-exit-active {
    left: -100%;
    transition: all .3s ease;
  }

  @media (max-width: 576px) {
    border: none !important;
    /* display: ${({ hideMobile }) => hideMobile ? 'none' : 'block'}; */
  }
`;

export default function Lateral() {
  const { chats, results, auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleEditProfile = () => dispatch(openProfile());

  const nodeRef = useRef(null);

  const showUsers = useMemo(() => {
    return results.searching && results.users.length > 0;
  }, [results.searching, results.users.length]);

  return (
    <LateralSectionStyled className='col-lg-3 col-sm-4 col-12 border-right' /*hideMobile={hideMobile}*/>
      <CSSTransition
        in={auth.user.edit}
        timeout={300}
        classNames='profile'
        unmountOnExit
        nodeRef={nodeRef}
      >
        <Profile ref={nodeRef} />
      </CSSTransition>
      <ProfileBar
        avatar={auth.user.avatar}
        username={auth.user.username}
        onClick={handleEditProfile}
      >
        <ProfileOptions />
      </ProfileBar>
      <SearchBar />
      <ListOfChats
        chats={results.searching ? results.chats : chats.collection}
        searching={results.searching}
      />
      {showUsers && <ListOfUsers users={results.users} />}
    </LateralSectionStyled>
  );
}