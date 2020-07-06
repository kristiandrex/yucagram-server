import React, { ChangeEvent, useState } from 'react';
import { User, State, DispatchI } from '../react-app-env';
import styled from 'styled-components';
import Cropper from './Cropper';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
	user: User;
}

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

export default function ProfileChooser({ user }: Props) {
	const [src, setSrc] = useState<string>(user.avatar);
	const [visible, setVisible] = useState<boolean>(false);
	const [uploaded, setUploaded] = useState<boolean>(false);
	const token = useSelector<State, string>((state) => state.token as string);

	const dispatch = useDispatch<DispatchI>();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files: FileList = event.target.files as FileList;

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
			const response = await axios.put('/users/avatar', { avatar: src }, { headers: { authorization: token } });

			console.log(response.data);

			dispatch({
				type: 'SET_USER',
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
			<div className={visible ? "d-none" : "card chooser shadow d-block"}>
				<div className="card-body text-center">
					<div className="card-title border-bottom">
						<h4>Elige tu foto</h4>
					</div>
					<div className="avatar-wrapper mb-4">
						<img src={src} alt={user.username} width="125px" height="125px" />
						<div>
							<input type="file" name="avatar" id="avatar" onChange={handleChange} />
							<label htmlFor="avatar" className="material-icons bg-dark p-2">
								edit
							</label>
						</div>
					</div>
					<div className="buttons">
						<button
							className="btn btn-outline-secondary mr-2"
							onClick={handleDiscard}
							hidden={!uploaded}
						>
							Descartar
						</button>
						<button className="btn btn-primary" onClick={handleSave}>Guardar</button>
					</div>
				</div>
			</div>
		</StyledChooser >
	)
}