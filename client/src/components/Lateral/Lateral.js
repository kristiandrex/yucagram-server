import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Profile from '../Profile/Profile';
import ProfileBar from '../Profile/ProfileBar';
import SearchBar from './SearchBar';
import ListChats from '../Chats/ListChats';
import ListUsers from '../Users/ListUsers';
import ProfileOptions from '../Profile/ProfileOptions';
import { openProfile } from '../../redux/actions/auth';

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

function Lateral() {
  const { chats, results, auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const handleEditProfile = () => dispatch(openProfile());

  const showUsers = useMemo(() => {
    return results.searching && results.users.length > 0;
  }, [results.searching, results.users.length]);

  // const hideMobile = useMemo(() => {
  //   return (chats.current.user !== null || chats.current.chat) !== null;
  // }, [chats]);

  return (
    <LateralSectionStyled className='col-lg-3 col-sm-4 col-12 border-right' /*hideMobile={hideMobile}*/>
      <CSSTransition
        in={auth.user.edit}
        timeout={300}
        classNames='profile'
        unmountOnExit
      >
        <Profile />
      </CSSTransition>
      <ProfileBar
        avatar={auth.user.avatar}
        username={auth.user.username}
        onClick={handleEditProfile}
      >
        <ProfileOptions />
      </ProfileBar>
      <SearchBar />
      <ListChats
        chats={results.searching ? results.chats : chats.collection}
        searching={results.searching}
      />
      {showUsers && <ListUsers users={results.users} />}
    </LateralSectionStyled>
  );
}

export default memo(Lateral);