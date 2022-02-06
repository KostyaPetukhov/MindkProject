import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { TextField } from 'formik-mui';
import { Button, Box, Avatar } from '@mui/material';
import { editUserProfile } from '../../containers/Users/api/crud';

import './style.css';
import ProfilePropTypes from '../../PropTypes/ProfilePropTypes';

const Profile = (props) => {
	const { id, name, avatar } = props;

	const schema = Yup.object().shape({
		nickname: Yup.string().min(2, 'At least two signs!'),
		name: Yup.string()
			.required('Required field!')
			.min(2, 'At least two signs'),
		email: Yup.string()
			.email('Type a correct email')
			.required('Required field!'),
		phone: Yup.string()
			.required('Required field!')
			.matches(
				/^[+]380[\d]{9}$/,
				'Enter phone number in the format: +380xxxxxxxxx'
			),
	});

	const mutation = useMutation((data) => editUserProfile(id, data));

	const onFormSubmit = (data) => {
		mutation.mutate({
			id: data.userid,
			username: data.name,
			pagename: data.nickname,
			email: data.email,
			phone: data.phone,
		});
	};

	return (
		<div>
			<Formik
				initialValues={{
					...props,
				}}
				onSubmit={onFormSubmit}
				validationSchema={schema}
			>
				<div className='userProfile'>
					<Form>
						<p className='userName'>
							{name}
							<Avatar
								alt={name}
								src={avatar}
								sx={{ width: 56, height: 56 }}
							/>
						</p>
						<Box margin={1}>
							<Field
								label='Page name:'
								component={TextField}
								type='input'
								name='nickname'
							/>
						</Box>
						<Box margin={1}>
							<Field
								label='Name:'
								component={TextField}
								type='input'
								name='name'
							/>
						</Box>
						<Box margin={1}>
							<Field
								label='Email:'
								component={TextField}
								type='email'
								name='email'
							/>
						</Box>
						<Box margin={1}>
							<Field
								label='Phone number:'
								component={TextField}
								type='input'
								name='phone'
							/>
						</Box>
						<div className='buttonBlock'>
							<Button variant='outlined'>Cancel</Button>
							<Button variant='contained' type='submit'>
								Edit
							</Button>
						</div>
					</Form>
				</div>
			</Formik>
		</div>
	);
};

Profile.propTypes = ProfilePropTypes;

export default Profile;
