import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { TextField } from 'formik-mui';
import { Button, Box } from '@mui/material';
import { editArticle } from '../../containers/Articles/api/crud';
import FormikAutocomplete from '../FormikAutocomplete';

import EditArticleFormPropTypes from '../../PropTypes/EditArticleFormPropTypes';

const EditArticleForm = (props) => {
	const { id, closeModal, closeMenu } = props;

	const schema = Yup.object().shape({
		content: Yup.string()
			.required('Required field!')
			.min(2, 'At least two signs!'),
	});

	const mutation = useMutation((data) => editArticle(id, data));

	const onFormSubmit = (data) => {
		mutation.mutate({
			articletitle: data.content,
			articleupdatedat: new Date(),
			visibility: data.visibility.value,
		});
	};

	const options = [
		{ value: 'All', label: 'All' },
		{ value: 'Friends', label: 'Friends' },
		{ value: 'Only me', label: 'Only Me' },
	];

	return (
		<Formik
			initialValues={{ ...props }}
			onSubmit={onFormSubmit}
			validationSchema={schema}
		>
			<Form>
				<Field
					component={TextField}
					as='textarea'
					name='content'
					className='textarea'
					multiline
					rows={7}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
				/>
				<Field
					sx={{ marginTop: '5px' }}
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
						onClick={(closeModal, closeMenu)}
					>
						Save
					</Button>
				</Box>
			</Form>
		</Formik>
	);
};

EditArticleForm.propTypes = EditArticleFormPropTypes;

export default EditArticleForm;
