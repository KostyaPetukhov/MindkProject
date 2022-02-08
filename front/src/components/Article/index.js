import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { TextField } from 'formik-mui';
import { Button } from '@mui/material';
import { editArticle } from '../../containers/Articles/api/crud';

import ArticlePropTypes from '../../PropTypes/ArticlePropTypes';
import './style.css';

const Article = (props) => {
	const { id, fullName, date } = props;

	const schema = Yup.object().shape({
		content: Yup.string()
			.required('Обязательное поле!')
			.min(2, 'Не менее двух символов!'),
	});

	const mutation = useMutation((data) => editArticle(id, data));

	const onFormSubmit = (data) => {
		mutation.mutate({
			articletitle: data.content,
			articleupdatedat: new Date(),
		});
	};

	return (
		<Formik
			initialValues={{ ...props }}
			onSubmit={onFormSubmit}
			validationSchema={schema}
		>
			<Form>
				<div className='articleInSocialNetwork'>
					<p className='name'>{fullName}</p>
					<p className='date'>{date}</p>
					<Field
						component={TextField}
						as='textarea'
						name='content'
						className='textarea'
					></Field>
					<div className='buttonBlock'>
						<Button variant='outlined'>Cancel</Button>
						<Button variant='contained' type='submit'>
							Edit
						</Button>
					</div>
				</div>
			</Form>
		</Formik>
	);
};

Article.propTypes = ArticlePropTypes;

export default Article;
