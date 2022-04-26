import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { TextField } from 'formik-mui';
import { Button, Box } from '@mui/material';
import { addComment } from '../../containers/Comment/api/crud';

import './style.css';

const AddArticleForm = (props) => {
	const { articleId, closeModal } = props;

	const schema = Yup.object().shape({
		content: Yup.string()
			.required('Required field!')
			.min(2, 'At least two signs!'),
	});

	const mutation = useMutation((data) => addComment(data));

	const onFormSubmit = (data) => {
		mutation.mutate({
			commenttitle: data.content,
			commentcreatedat: new Date(),
			articleid: articleId,
		});
	};

	const navigate = useNavigate();
	const goToArticlesPage = () => {
		closeModal();
		navigate('/articles');
	};

	return (
		<Formik
			initialValues={{}}
			onSubmit={onFormSubmit}
			validationSchema={schema}
		>
			<Form>
				<Field
					component={TextField}
					label='Add comment'
					as='textarea'
					name='content'
					className='textarea'
					multiline
					rows={5}
					sx={{ marginTop: '8px', marginBottom: '4px' }}
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
	articleId: PropTypes.number.isRequired,
	closeModal: PropTypes.func,
};

export default AddArticleForm;
