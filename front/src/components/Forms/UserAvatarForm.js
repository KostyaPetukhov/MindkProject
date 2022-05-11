import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Formik, Form } from 'formik';
import { serialize } from 'object-to-formdata';
const dataURLtoBlob = require('blueimp-canvas-to-blob');

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import { addUserAvatar } from '../../containers/Users/api/crud';

const CustomTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		boxShadow: theme.shadows[1],
		fontSize: 14,
		fontWeight: 400,
	},
}));

const UserAvatarForm = (props) => {
	const { id, avatar, username } = props;

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

	const mutation = useMutation((data) => addUserAvatar(id, data));

	const onFormSubmit = (data, { setSubmitting }) => {
		setSubmitting(true);
		const formData = serialize(data);

		if (croppedImage) {
			formData.append(
				'avatar',
				dataURLtoBlob(croppedImage),
				`user-${id}-avatar`
			);
		}

		mutation.mutate(formData);
		setSubmitting(false);
		document.location.reload();
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
					<Box>
						{!image && (
							<CustomTooltip
								title='Change avatar'
								arrow
								disableInteractive
							>
								<Button component='label'>
									<input
										type='file'
										hidden
										onChange={handleChange}
									/>
									<Avatar
										alt={username}
										src={`http://localhost:3333/${avatar}`}
										sx={{
											width: 120,
											height: 120,
											fontSize: 40,
											bgcolor: deepOrange[500],
										}}
									/>
								</Button>
							</CustomTooltip>
						)}

						{image && (
							<Cropper
								src={image}
								style={{ height: 250, width: 250 }}
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
							<Box
								paddingTop={2}
								display='flex'
								justifyContent='space-between'
							>
								<Button
									variant='outlined'
									onClick={deleteAvatar}
								>
									Cancel
								</Button>
								<Button variant='contained' onClick={cropImage}>
									Crop
								</Button>
							</Box>
						)}
						{croppedImage && (
							<Box
								paddingTop={2}
								display='flex'
								justifyContent='center'
							>
								<Button variant='contained' type='submit'>
									Save
								</Button>
							</Box>
						)}
					</Box>
				</Form>
			</Formik>
		</div>
	);
};

UserAvatarForm.propTypes = {
	id: PropTypes.number,
	username: PropTypes.string,
	avatar: PropTypes.string,
};

export default UserAvatarForm;
