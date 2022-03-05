import React, { useState } from 'react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { TextField } from 'formik-mui';
import { Button, CardMedia } from '@mui/material';
import { editArticle } from '../../containers/Articles/api/crud';
import FormikAutocomplete from '../FormikAutocomplete';
import { serialize } from 'object-to-formdata';
const dataURLtoBlob = require('blueimp-canvas-to-blob');
import ArticlePropTypes from '../../PropTypes/ArticlePropTypes';
import './style.css';

const Article = (props) => {
	const { id, image } = props;

	const schema = Yup.object().shape({
		content: Yup.string()
			.required('Обязательное поле!')
			.min(2, 'Не менее двух символов!'),
	});

	const mutation = useMutation((data) => editArticle(id, data));

	const onFormSubmit = (data) => {
		const formData = serialize({
			articletitle: data.content,
			articleupdatedat: new Date(),
			visibility: data.visibility.value,
		});
		if (picture) {
			formData.append(
				'image',
				dataURLtoBlob(picture),
				`article-${id}-image`
			);
		}
		mutation.mutate(formData);
	};

	const options = [
		{ value: 'all', label: 'All' },
		{ value: 'friends', label: 'Friends' },
		{ value: 'only me', label: 'Only Me' },
	];

	const [picture, setPicture] = useState();

	const imageType = 'image.jpeg' || 'image.jpg' || 'image.png';

	const handleChange = (e) => {
		e.preventDefault();
		const file = e.target.files[0];

		if (file.type.match(imageType)) {
			const reader = new FileReader();
			reader.onload = () => {
				setPicture(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			console.error('Incorrect file format!');
		}
	};

	return (
		<Formik
			initialValues={{ ...props }}
			onSubmit={onFormSubmit}
			validationSchema={schema}
		>
			<Form>
				<>
					<Field
						component={TextField}
						as='textarea'
						name='content'
						className='textarea'
						multiline
						rows={6}
					/>
					{image && (
						<CardMedia
							component='img'
							image={`http://localhost:3333/${image}`}
							height='300px'
						/>
					)}

					<Field
						component={FormikAutocomplete}
						name='visibility'
						options={options}
						value={options.value}
					/>
					<div className='buttonBlock'>
						<Button variant='outlined'>Cancel</Button>
						<Button variant='contained' component='label'>
							Change image
							<input
								type='file'
								name='image'
								hidden
								onChange={handleChange}
							/>
						</Button>
						<Button variant='contained' type='submit'>
							Edit
						</Button>
					</div>
				</>
			</Form>
		</Formik>
	);
};

Article.propTypes = ArticlePropTypes;

export default Article;
