import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TextField } from 'formik-mui';
import { Button, Box } from '@mui/material';
import { addArticle } from '../../containers/Articles/api/crud';
import FormikAutocomplete from '../FormikAutocomplete';

import './style.css';

const AddArticleForm = (props) => {
	const { closeModal } = props;

	const schema = Yup.object().shape({
		content: Yup.string()
			.required('Required field!')
			.min(2, 'At least two signs!'),
	});

	const mutation = useMutation((data) => addArticle(data));

	const onFormSubmit = (data) => {
		mutation.mutate({
			articletitle: data.content,
			articlecreatedat: new Date(),
			visibility: data.visibility.value,
		});
	};

	const options = [
		{ value: 'All', label: 'All' },
		{ value: 'Friends', label: 'Friends' },
		{ value: 'Only me', label: 'Only Me' },
	];

	const navigate = useNavigate();
	const goToArticlesPage = () => {
		closeModal();
		navigate('/articles');
	};

	return (
		<Formik
			initialValues={{
				visibility: 'All',
			}}
			onSubmit={onFormSubmit}
			validationSchema={schema}
		>
			<Form>
				<Field
					component={TextField}
					label='Post new article'
					as='textarea'
					name='content'
					className='textarea'
					multiline
					rows={7}
					sx={{ marginTop: '8px', marginBottom: '8px' }}
				/>
				<Field
					component={FormikAutocomplete}
					name='visibility'
					options={options}
				/>
				<Box className='buttonBlock'>
					<Button variant='outlined' onClick={closeModal}>
						Cancel
					</Button>
					<Button
						variant='contained'
						type='submit'
						onClick={goToArticlesPage}
					>
						Add
					</Button>
				</Box>
			</Form>
		</Formik>
	);
};

AddArticleForm.propTypes = {
	closeModal: PropTypes.func,
};

export default AddArticleForm;
