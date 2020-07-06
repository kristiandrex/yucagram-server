import React, { useState, Dispatch, SetStateAction } from 'react'
import ReactImageCrop, { Crop } from 'react-image-crop';
import styled from 'styled-components';
import cropImage from '../helpers/cropImage';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { State } from '../react-app-env';

interface Props {
   src: string;
   onDiscard: () => void;
   setSrc: Dispatch<SetStateAction<string>>;
   setVisible: Dispatch<SetStateAction<boolean>>;
   setUploaded: Dispatch<SetStateAction<boolean>>;
}

const StyledCropper = styled.div`
   width: 100%;
   height: 100vh;
   overflow: hidden;
   display: grid;
   grid-template-rows: 1fr auto;

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

export default function Cropper({ src, onDiscard, setSrc, setVisible, setUploaded }: Props) {
   const token = useSelector<State, string>((state) => state.token as string);

   const [crop, setCrop] = useState<Crop>({ aspect: 1 });
   const [image, setImage] = useState<HTMLImageElement | null>(null);

   const handleLoaded = (image: HTMLImageElement) => {
      const landscape: boolean = image.width > image.height;

      const percent = landscape ? (image.height * 100) / image.width : (image.width * 100) / image.height;
      const width: number = landscape ? Math.round(percent) : 100;

      const x: number = landscape ? ((100 - percent) / 2) : 0;
      const y: number = landscape ? 0 : ((100 - percent) / 2);

      setImage(image);
      setCrop({ aspect: 1, unit: '%', width, x, y });
      return false;
   }

   const handleCrop = async () => {
      const blob = await cropImage(image as HTMLImageElement, crop);

      const formData = new FormData();
      formData.append('avatar', blob);

      try {
         const response = await axios.post('/uploads', formData, { headers: { Authorization: token } });
         setVisible(false);
         setSrc(response.data.url);
         setUploaded(true);
      }

      catch (error) {
         console.error(error);
      }
   };

   return (
      <StyledCropper className="cropper">
         <div className="wrapper bg-light">
            <ReactImageCrop
               src={src}
               crop={crop}
               onChange={(crop, percentCrop) => setCrop(percentCrop)}
               circularCrop={true}
               onImageLoaded={handleLoaded}
            />
         </div>
         <div className="buttons p-3 bg-light border-top text-center">
            <button
               className="btn btn-outline-secondary mr-2"
               onClick={onDiscard}
            >
               Descartar
            </button>
            <button
               className="btn btn-primary"
               onClick={handleCrop}
            >
               Guardar
               </button>
         </div>
      </StyledCropper>
   )
}
