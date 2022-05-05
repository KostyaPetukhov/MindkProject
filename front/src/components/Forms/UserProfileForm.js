import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';

import { TextField, Select } from 'formik-mui';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import {
	editUserProfile,
	getUniversities,
} from '../../containers/Users/api/crud';
import FormikAutocomplete from '../FormikAutocomplete';
import UserProfileFormPropTypes from '../../PropTypes/UserProfileFormPropTypes';
import './style.css';

const UserProfileForm = (props) => {
	const { id } = props;

	const schema = Yup.object().shape({
		pagename: Yup.string().min(2, 'At least two signs!'),
		username: Yup.string()
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
		university: Yup.string().required('Required field!'),
	});

	const mutation = useMutation((data) => editUserProfile(id, data));

	const onFormSubmit = (data, { setSubmitting }) => {
		setSubmitting(true);
		mutation.mutate({
			id: data.userid,
			username: data.username,
			pagename: data.pagename,
			email: data.email,
			phone: data.phone,
			university: data.university,
			usernamevisibility: data.usernamevisibility.value,
			pagenamevisibility: data.pagenamevisibility.value,
			emailvisibility: data.emailvisibility.value,
			phonevisibility: data.phonevisibility.value,
			universityvisibility: data.universityvisibility.value,
		});
		setSubmitting(false);
	};

	const options = [
		{ value: 'All', label: 'All' },
		{ value: 'Friends', label: 'Friends' },
		{ value: 'Only me', label: 'Only Me' },
	];

	const { data } = useQuery('univers', () => getUniversities());
	const universities = data?.data || [];

	return (
		<>
			<Formik
				initialValues={{
					...props,
				}}
				onSubmit={onFormSubmit}
				validationSchema={schema}
			>
				<div className='userProfile'>
					<Form>
						<Box className='blockWithSelect'>
							<Field
								label='Page name:'
								component={TextField}
								type='input'
								name='pagename'
							/>
							<Field
								className='select'
								component={FormikAutocomplete}
								name='pagenamevisibility'
								options={options}
							/>
						</Box>
						<Box className='blockWithSelect'>
							<Field
								label='Name:'
								component={TextField}
								type='input'
								name='username'
							/>
							<Field
								className='select'
								component={FormikAutocomplete}
								name='usernamevisibility'
								options={options}
							/>
						</Box>
						<Box className='blockWithSelect'>
							<Field
								label='Email:'
								component={TextField}
								type='email'
								name='email'
								disabled
							/>
							<Field
								className='select'
								component={FormikAutocomplete}
								name='emailvisibility'
								options={options}
							/>
						</Box>
						<Box className='blockWithSelect'>
							<Field
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
							/>
						</Box>
						<Box className='blockWithSelect'>
							<Field
								component={Select}
								name='university'
								label='University:'
								sx={{ width: '210px' }}
								as='select'
							>
								{universities.map((university) => (
									<MenuItem
										key={university.id}
										value={university.name}
									>
										{university.name}
									</MenuItem>
								))}
							</Field>
							<Field
								className='select'
								component={FormikAutocomplete}
								name='universityvisibility'
								options={options}
							/>
						</Box>
						<Box padding={1}>
							<Button variant='contained' type='submit'>
								Save
							</Button>
						</Box>
					</Form>
				</div>
			</Formik>
		</>
	);
};

UserProfileForm.propTypes = UserProfileFormPropTypes;

export default UserProfileForm;
