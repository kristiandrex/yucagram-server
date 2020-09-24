import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import AvatarChooser from './AvatarChooser';
import { closeProfile } from '../../redux/actions/auth';

const StyledProfile = styled.div`
  background: #fff;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;

  .top-bar {
    height: 65px;

    span {
      line-height: 47px;
      vertical-align: middle;
    }
  }

  .material-icons {
    cursor: pointer;
    margin-right: .5rem;
  }
`;

export default function Profile() {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeProfile());

  return (
    <StyledProfile>
      <div className='top-bar p-2 bg-primary text-white'>
        <span className='material-icons' onClick={handleClose}>keyboard_backspace</span>
        <span className='font-weight-bold'>Perfil</span>
      </div>
      <div className='p-4 d-flex justify-content-center'>
        <AvatarChooser />
      </div>
    </StyledProfile>
  );
}