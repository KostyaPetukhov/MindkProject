import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { TextField } from 'formik-mui';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { editComment } from '../../containers/Comment/api/crud';

const EditArticleForm = (props) => {
	const { id, closeModal, closeMenu } = props;

	const schema = Yup.object().shape({
		content: Yup.string()
			.required('Required field!')
			.min(2, 'At least two signs!'),
	});

	const mutation = useMutation((data) => editComment(id, data));

	const onFormSubmit = (data) => {
		mutation.mutate({
			commenttitle: data.content,
			commentupdatedat: new Date(),
		});
	};

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

EditArticleForm.propTypes = {
	id: PropTypes.number.isRequired,
	content: PropTypes.string,
	closeModal: PropTypes.func,
	closeMenu: PropTypes.func,
};

export default EditArticleForm;
