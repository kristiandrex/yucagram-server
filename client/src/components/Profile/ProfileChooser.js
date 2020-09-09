import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { object } from 'prop-types'
import Cropper from './Cropper';
import types from '../../redux/types';

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

			.avatar-wrapper {
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
			}
		}
	}
`;

export default function ProfileChooser({ user }) {
	const [src, setSrc] = useState(user.avatar);
	const [visible, setVisible] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const token = useSelector((state) => state.auth.token);

	const dispatch = useDispatch();

	const handleChange = (event) => {
		const files = event.target.files;

		URL.revokeObjectURL(src);
		setSrc(URL.createObjectURL(files[0]));
		setVisible(true);
	};

	const handleDiscard = () => {
		URL.revokeObjectURL(src);

		setVisible(false);
		setSrc(user.avatar);
		setUploaded(false);
	};

	const handleSave = async () => {
		try {
			const response = await axios.put('/api/users/avatar', { avatar: src }, { headers: { authorization: token } });

			dispatch({
				type: types.SET_USER,
				payload: response.data.user
			});
		}

		catch (error) {
			console.error(error);
		}
	};
	return (
		<StyledChooser>
			{
				visible && (
					<Cropper
						src={src}
						setSrc={setSrc}
						onDiscard={handleDiscard}
						setVisible={setVisible}
						setUploaded={setUploaded}
					/>
				)
			}
			<div className={visible ? 'd-none' : 'card chooser shadow d-block'}>
				<div className='card-body text-center'>
					<div className='card-title border-bottom'>
						<h4>Elige tu foto</h4>
					</div>
					<div className='avatar-wrapper mb-4'>
						<img src={src} alt={user.username} width='125px' height='125px' />
						<div>
							<input type='file' name='avatar' id='avatar' onChange={handleChange} />
							<label htmlFor='avatar' className='material-icons bg-dark p-2'>
								edit
							</label>
						</div>
					</div>
					<div className='buttons'>
						<button className='btn btn-outline-secondary mr-2' onClick={handleDiscard} hidden={!uploaded}>
							Descartar
						</button>
						<button className='btn btn-primary' onClick={handleSave}>Guardar</button>
					</div>
				</div>
			</div>
		</StyledChooser>
	);
}

ProfileChooser.propTypes = {
	user: object.isRequired
}