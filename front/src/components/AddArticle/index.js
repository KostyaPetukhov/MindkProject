import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { TextField } from 'formik-mui';
import { Button } from '@mui/material';
import { addArticle } from '../../containers/Articles/api/crud';
import FormikAutocomplete from '../FormikAutocomplete';
import { serialize } from 'object-to-formdata';
const dataURLtoBlob = require('blueimp-canvas-to-blob');
import './style.css';

const AddArticle = () => {
	const schema = Yup.object().shape({
		content: Yup.string()
			.required('Required field!')
			.min(2, 'At least two signs!'),
	});

	const mutation = useMutation((data) => addArticle(data));

	const onFormSubmit = (data) => {
		const formData = serialize({
			articletitle: data.content,
			articlecreatedat: new Date(),
			visibility: data.visibility.value,
		});
		if (picture) {
			formData.append('image', dataURLtoBlob(picture), `article-image`);
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
		<div>
			<Formik
				initialValues={{
					visibility: 'All',
				}}
				onSubmit={onFormSubmit}
				validationSchema={schema}
			>
				<div className='addArticle'>
					<Form>
						<Field
							component={TextField}
							label='Post new article'
							variant='outlined'
							as='textarea'
							name='content'
							className='textarea'
							multiline
							rows={5}
						/>
						<Field
							component={FormikAutocomplete}
							name='visibility'
							options={options}
							value={options.value}
						/>
						<div className='buttonBlock'>
							<Button variant='outlined'>Cancel</Button>
							<Button variant='contained' component='label'>
								Add image
								<input
									type='file'
									name='image'
									hidden
									onChange={handleChange}
								/>
							</Button>
							<Button variant='contained' type='submit'>
								Add article
							</Button>
						</div>
					</Form>
				</div>
			</Formik>
		</div>
	);
};

export default AddArticle;
