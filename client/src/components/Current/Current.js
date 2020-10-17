import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import ProfileBar from 'components/Profile/ProfileBar';
import ListOfMessages from 'components/Messages/ListOfMessages';
import MessageBox from 'components/Messages/MessageBox';
import { deleteChat, addChat } from 'actions/chats';
import types from 'types';

const StyledCurrent = styled.div`
  display: grid;
  grid-template-rows: 65px auto 60px;
  grid-template-areas: "top" "mid" "bottom";

  .profile-bar {
    display: grid;
    align-items: center;
    grid-area: top;

    @media(max-width: 576px){
      grid-template-columns: auto 1fr;
    }
  }

  .messages {
    grid-area: mid;
    height: 100%;
    overflow-y: auto;
  }

  .messages-box {
    grid-area: bottom;
    background-color: #f8f9fa;
    height: 60px;
    display: flex;
    align-items: center;
  }
`;

export default function Current() {
  const current = useSelector((state) => state.chats.current);
  const dispatch = useDispatch();

  const handleClose = () => dispatch({ type: types.CLOSE_CURRENT });
  const handleDelete = () => dispatch(deleteChat(current._id, current.index));
  const handleAdd = () => dispatch(addChat(current.user));

  if (current === null) {
    return null;
  }

  return (
    <StyledCurrent className='col-12 col-lg-9 col-sm-8 current-layout h-100'>
      <div className='shadow-sm profile-bar bg-primary'>
        <i className='material-icons text-white d-sm-none pl-2' onClick={handleClose}>arrow_back</i>
        <div className='dropdown'>
          <ProfileBar
            avatar={current.user.avatar}
            username={current.user.username}
          >
            <Dropdown>
              <Dropdown.Toggle>
                <span className='material-icons text-white'>more_vert</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  current._id !== null
                    ? <Dropdown.Item onClick={handleDelete}>Eliminar chat</Dropdown.Item>
                    : <Dropdown.Item onClick={handleAdd}>Agregar chat</Dropdown.Item>
                }
              </Dropdown.Menu>
            </Dropdown>
          </ProfileBar>
        </div>
      </div>
      <ListOfMessages messages={current.messages} />
      <MessageBox />
    </StyledCurrent>
  );
}