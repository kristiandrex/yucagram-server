import React, { useState, createRef } from 'react';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function AvatarChooser(props) {
  const inputRef = createRef();

  const [isDefaultAvatar, setIsDefaultAvatar] = useState(true);
  const [src, setSrc] = useState();
  const [crop, setCrop] = useState({
    aspect: 1,
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });

  const [visible, setVisible] = useState(false);
  const [img, setImg] = useState();
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState(
    'https://res.cloudinary.com/kristiantorrex/image/upload/v1587258574/undraw_male_avatar_323b_gukmtl.svg'
  );

  const handleUploadAvatar = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    setSrc(URL.createObjectURL(file));
    setVisible(!visible);
    event.target.value = '';
  };

  const handleCrop = () => {
    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      setAvatar(url);
      setFile(blob);
      setVisible(!visible);
      setIsDefaultAvatar(false);
    });
  };

  return (
    <div className='text-center'>
      {visible && (
        <div className='modal' style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body'>
                <Cropper
                  src={src}
                  onChange={(crop) => setCrop(crop)}
                  crop={crop}
                  circularCrop={true}
                  onImageLoaded={(img) => setImg(img)}
                />
              </div>
              <div className='modal-footer'>
                <button className='btn btn-secondary' onClick={() => setVisible(!visible)}>
                  Cerrar
                </button>
                <button className='btn btn-primary' onClick={handleCrop}>
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='row mb-3'>
        <div className='col'>
          <img
            src={avatar}
            alt='Tu foto'
            width='200'
            height='200'
            className='rounded-circle border'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <input
            type='file'
            name='avatar'
            id='avatar'
            className='d-none'
            accept='.png, .jpg, .jpeg'
            onChange={handleUploadAvatar}
            ref={inputRef}
          />
          <button
            htmlFor='avatar'
            className='btn btn btn-outline-primary mr-2'
            onClick={() => inputRef.current.click()}
          >
            <i className='material-icons'>publish</i>
            Subir
          </button>
          <button
            type='submit'
            className='btn btn btn-outline-primary'
            onClick={() => props.onSave(file, isDefaultAvatar)}
          >
            <i className='material-icons'>save</i>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
