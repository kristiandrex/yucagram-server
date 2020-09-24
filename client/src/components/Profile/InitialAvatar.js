import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import AvatarChooser from './AvatarChooser';
// import { defaultAvatar } from '../../redux/actions/auth';

const StyledChooser = styled.div`
  display: flex;
  height: 100%; 
  width: 100%;
  align-items: center;
  justify-content: center;

  .card.chooser {
    width: 250px;

    .card-body {
      display: flex;
      flex-direction: column;
      align-items: center;

      .card-title {
        width: 100%;
        padding-bottom: 1.25rem;
        margin-bottom: 1.25rem;

        h4 {
          margin-bottom: 0px;
        }
      }
    }
  }
`;

export default function InitialAvatar() {
  const dispatch = useDispatch();
  // const handleSave = () => dispatch(defaultAvatar());

  return (
    <StyledChooser>
      <div className='card chooser shadow d-block'>
        <div className='card-body text-center'>
          <div className='card-title border-bottom'>
            <h4>Elige tu foto</h4>
          </div>
          <AvatarChooser />
          <button 
            className='btn btn-outline-primary mr-2' 
          >
            Guardar
          </button>
        </div>
      </div>
    </StyledChooser>
  );
}