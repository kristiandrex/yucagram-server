import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Cropper from './Cropper';
import { changeAvatar } from '../../redux/actions/auth';

const StyledAvatarChooser = styled.div`
  width: 125px;
  height: 125px;
  position: relative;
  display: block;

  img {
    border-radius: 100%;
  }

  input#avatar {
    display: none;
  }

  label {
    cursor: pointer;
    margin: 0;
    border: 3px solid #fff;
    position: absolute;
    bottom: 0px;
    right: 0px;
    color: #fff;
    border-radius: 100%;
  }
`;

export default function AvatarChooser() {
  const { avatar, username } = useSelector((state) => state.auth.user);
  const [show, setShow] = useState(false);
  const [src, setSrc] = useState();

  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleChange = () => {
    const file = ref.current.files[0];
    setShow(true);
    setSrc(URL.createObjectURL(file));
  };

  const handleDiscard = () => {
    ref.current.value = null;
    URL.revokeObjectURL(src);
    setShow(false);
  };

  const handleCrop = async (region) => {
    const formData = new FormData();
    formData.append('avatar', ref.current.files[0]);
    formData.append('region', JSON.stringify(region));

    changeAvatar(formData)
      .then(action => {
        dispatch(action);
        setShow(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <StyledAvatarChooser className='mb-4'>
      {show && <Cropper src={src} onCrop={handleCrop} onDiscard={handleDiscard} />}
      <img src={avatar} alt={username} width='125px' height='125px' />
      <div>
        <input
          type='file'
          name='avatar'
          id='avatar'
          onChange={handleChange}
          ref={ref}
        />
        <label htmlFor='avatar' className='material-icons bg-primary p-2'>edit</label>
      </div>
    </StyledAvatarChooser>
  );
}