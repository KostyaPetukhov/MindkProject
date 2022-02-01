import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { TextField, InputBase } from 'formik-mui';
import { Button } from '@mui/material';
import { addArticle } from '../../containers/Articles/api/crud';

import './style.css';

const AddArticle = () => {
	const schema = Yup.object().shape({
		userid: Yup.number().required('Required field!'),
		content: Yup.string()
			.required('Required field!')
			.min(2, 'At least two signs!'),
	});

	const mutation = useMutation((data) => addArticle(data));

	const onFormSubmit = (data) => {
		mutation.mutate({
			userid: data.userid,
			articletitle: data.content,
			articlecreatedate: new Date(),
		});
	};

	return (
		<Formik
			initialValues={{
				userid: '1',
				content: 'Post new article..',
			}}
			onSubmit={onFormSubmit}
			validationSchema={schema}
		>
			<div className='addArticle'>
				<p>Add article</p>
				<Form>
					<Field component={InputBase} type='input' name='userid' />
					<ErrorMessage
						name='userid'
						className='error'
						component='div'
					/>
					<Field
						component={TextField}
						as='textarea'
						name='content'
						className='textarea'
					/>
					<div className='buttonBlock'>
						<Button variant='outlined'>Cancel</Button>
						<Button variant='contained' type='submit'>
							Add
						</Button>
					</div>
				</Form>
			</div>
		</Formik>
	);
};

export default AddArticle;
