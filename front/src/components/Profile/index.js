import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { TextField } from 'formik-mui';
import { Button, Box } from '@mui/material';
import { editUserProfile } from '../../containers/Users/api/crud';
import FormikAutocomplete from '../FormikAutocomplete';

import './style.css';
import ProfilePropTypes from '../../PropTypes/ProfilePropTypes';

const Profile = (props) => {
	const { id } = props;

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
			emailvisibility: data.emailvisibility.value,
			phonevisibility: data.phonevisibility.value,
		});
	};

	const options = [
		{ value: 'all', label: 'All' },
		{ value: 'friends', label: 'Friends' },
		{ value: 'me', label: 'Only Me' },
	];

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
						<Box margin={1} className='blockWithSelect'>
							<Field
								label='Email:'
								component={TextField}
								type='email'
								name='email'
							/>
							<Field
								className='select'
								component={FormikAutocomplete}
								name='emailvisibility'
								options={options}
								value={options.value}
							/>
						</Box>
						<Box margin={1} className='blockWithSelect'>
							<Field
								className='info'
								label='Phone number:'
								component={TextField}
								type='input'
								name='phone'
							/>
							<Field
								className='select'
								component={FormikAutocomplete}
								name='phonevisibility'
								options={options}
								value={options.value}
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
