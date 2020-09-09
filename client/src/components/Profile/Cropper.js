import React, { useState } from 'react';
import ReactImageCrop from 'react-image-crop';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import { scaleImage, cropImage } from '../../helpers/image';
import 'react-image-crop/dist/ReactCrop.css';

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
export default function Cropper({ src, onDiscard, setSrc, setVisible, setUploaded }) {
	const token = useSelector((state) => state.auth.token);
	const [crop, setCrop] = useState({ aspect: 1 });
	const [image, setImage] = useState(null);

	const handleLoaded = (image) => {
		const { x, y, width } = scaleImage(image);

		setImage(image);
		setCrop({ aspect: 1, unit: '%', width, x, y });

		return false;
	};

	const handleCrop = async () => {
		const blob = await cropImage(image, crop);
		const formData = new FormData();
		formData.append('avatar', blob);

		try {
			const response = await axios.post('/api/uploads', formData, { headers: { Authorization: token } });

			setVisible(false);
			setSrc(response.data.url);
			setUploaded(true);
		}

		catch (error) {
			console.error(error);
		}
	};

	return (
		<StyledCropper className='cropper'>
			<div className='wrapper bg-light'>
				<ReactImageCrop
					src={src}
					crop={crop}
					onChange={(crop, percentCrop) => setCrop(percentCrop)}
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
		</StyledCropper>
	);
}

Cropper.propTypes = {
	src: PropTypes.string.isRequired,
	onDiscard: PropTypes.func.isRequired,
	setSrc: PropTypes.func.isRequired,
	setVisible: PropTypes.func.isRequired,
	setUploaded: PropTypes.func.isRequired
};