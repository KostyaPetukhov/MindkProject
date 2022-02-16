import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { Formik, Form } from 'formik';
import { Avatar } from '@mui/material';
import { Button, Box } from '@mui/material';
import { addUserAvatar } from '../../containers/Users/api/crud';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './style.css';

import { serialize } from 'object-to-formdata';
const dataURLtoBlob = require('blueimp-canvas-to-blob');

const UserAvatar = (props) => {
	const { id, name, avatar } = props;

	const mutation = useMutation((data) => addUserAvatar(id, data));

	const onFormSubmit = (data) => {
		const formData = serialize(data);

		if (croppedImage) {
			formData.append(
				'avatar',
				dataURLtoBlob(croppedImage),
				`user-${id}-avatar`
			);
		}
		mutation.mutate(formData);
	};

	const [image, setImage] = useState();
	const [croppedImage, setCroppedImage] = useState();
	const [cropper, setCtopper] = useState();

	const imageType = 'image.jpeg' || 'image.jpg' || 'image.png';

	const handleChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		if (file.type.match(imageType)) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			console.error('Incorrect file format!');
		}
	};

	const cropImage = () => {
		if (typeof cropper !== 'undefined') {
			setCroppedImage(cropper.getCroppedCanvas().toDataURL());
			setImage(null);
		}
	};

	const deleteAvatar = () => {
		setCroppedImage(null);
		setImage(null);
	};

	return (
		<div>
			<Formik
				initialValues={{
					...props,
				}}
				onSubmit={onFormSubmit}
			>
				<Form className='avatarForm'>
					<Box className='userName'>{name}</Box>
					<Box margin={1}>
						<Avatar
							alt={name}
							src={`http://localhost:3333/${avatar}`}
							sx={{ width: 120, height: 120 }}
						/>
					</Box>
					<Box margin={1}>
						{!image && (
							<Button variant='contained' component='label'>
								Choose avatar
								<input
									type='file'
									hidden
									onChange={handleChange}
								/>
							</Button>
						)}
						{image && (
							<Button variant='contained' onClick={deleteAvatar}>
								Delete avatar
							</Button>
						)}
						{image && (
							<Cropper
								src={image}
								style={{ height: 400, width: 400 }}
								onInitialized={(instance) =>
									setCtopper(instance)
								}
								minCropBoxHeight={120}
								minCropBoxWidth={120}
								zoomTo={0.5}
								rotatable={false}
								viewMode={1}
							/>
						)}
						{image && (
							<Button variant='contained' onClick={cropImage}>
								Crop avatar
							</Button>
						)}
						{croppedImage && (
							<Button variant='contained' type='submit'>
								Save avatar
							</Button>
						)}
					</Box>
				</Form>
			</Formik>
		</div>
	);
};

UserAvatar.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	avatar: PropTypes.string,
};

export default UserAvatar;
