import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import ReactImageCrop from 'react-image-crop';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { scaleImage } from '../../helpers/image';
import 'react-image-crop/dist/ReactCrop.css';

const StyledCropper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;

  .wrapper {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;

    .ReactCrop__image {
      max-height: calc(100vh - 71px - 2rem);
    }
  }
`;

const root = document.getElementById('root');

export default function Cropper({ src, onDiscard, onCrop }) {
  const [crop, setCrop] = useState({ aspect: 1 });
  const [scale, setScale] = useState({ x: 0, y: 0 });

  const handleLoaded = (image) => {
    const { x, y, width } = scaleImage(image);
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    setCrop({ aspect: 1, unit: 'px', width, x, y });
    setScale({ x: scaleX, y: scaleY });

    return false;
  };

  const handleCrop = () => {
    const region = {
      top: parseInt(crop.y * scale.y),
      left: parseInt(crop.x * scale.x),
      width: parseInt(crop.width * scale.x),
      height: parseInt(crop.height * scale.y)
    };

    return onCrop(region);
  };

  return createPortal(
    <StyledCropper>
      <div className='wrapper bg-light'>
        <ReactImageCrop
          src={src}
          crop={crop}
          onChange={(crop) => setCrop(crop)}
          circularCrop={true}
          onImageLoaded={handleLoaded}
        />
      </div>
      <div className='buttons p-3 bg-light border-top text-center'>
        <button className='btn btn-outline-secondary mr-2' onClick={onDiscard}>
          Descartar
        </button>
        <button className='btn btn-primary' onClick={handleCrop}>
          Guardar
        </button>
      </div>
    </StyledCropper>,
    root
  );
}

Cropper.propTypes = {
  src: PropTypes.string.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired
};