import React, { useState, createRef, RefObject, ChangeEvent } from 'react';
import Cropper, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
  onSave: Function;
}

export default function AvatarChooser(props: Props) {
  const inputRef = createRef<HTMLInputElement>();

  const [isDefaultAvatar, setIsDefaultAvatar] = useState(true);
  const [src, setSrc] = useState<string>();
  const [crop, setCrop] = useState<Crop>({
    aspect: 1,
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });

  const [visible, setVisible] = useState<boolean>(false);
  const [img, setImg] = useState<HTMLImageElement>();
  const [file, setFile] = useState<Blob>();
  const [avatar, setAvatar] = useState<string>(
    'https://res.cloudinary.com/kristiantorrex/image/upload/v1587258574/undraw_male_avatar_323b_gukmtl.svg'
  );

  const handleUploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = (event.target.files as FileList)[0];

    setSrc(URL.createObjectURL(file));
    setVisible(!visible);
    event.target.nodeValue = '';
  };

  const handleCrop = () => {
    const canvas = document.createElement('canvas');
    canvas.width = crop.width as number;
    canvas.height = crop.height as number;

    const image = img as HTMLImageElement;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.drawImage(
      image,
      (crop.x as number) * scaleX,
      (crop.y as number) * scaleY,
      (crop.width as number) * scaleX,
      (crop.height as number) * scaleY,
      0,
      0,
      crop.width as number,
      crop.height as number
    );

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);

      setAvatar(url);
      setFile(blob as Blob);
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
                  src={src as string}
                  onChange={(crop) => setCrop(crop)}
                  crop={crop}
                  circularCrop={true}
                  onImageLoaded={(img) => setImg(img)}
                />
              </div>
              <div className='modal-footer'>
                <button
                  className='btn btn-secondary'
                  onClick={() => setVisible(!visible)}
                >
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
            ref={inputRef as RefObject<HTMLInputElement>}
          />
          <button
            className='btn btn btn-outline-primary mr-2'
            onClick={() => (inputRef.current as HTMLInputElement).click()}
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
