import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';

import TextField from '@mui/material/TextField';

import { fieldToTextField } from 'formik-mui';

const FormikAutocomplete = (props) => {
	const {
		form: { setTouched, setFieldValue },
	} = props;
	const { error, helperText, ...field } = fieldToTextField(props);
	const { name, value } = field;

	return (
		<Autocomplete
			{...props}
			{...field}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			getOptionLabel={(option) => (option.label ? option.label : value)}
			onChange={(_, value) => setFieldValue(name, value)}
			onBlur={() => setTouched({ [name]: true })}
			// defaultValue={value || 'All'}
			renderInput={(props) => (
				<TextField
					{...props}
					variant='outlined'
					helperText={helperText}
					error={error}
					label='Available to'
				/>
			)}
		/>
	);
};

FormikAutocomplete.propTypes = {
	form: PropTypes.object,
	setTouched: PropTypes.string,
	setFieldValue: PropTypes.string,
};

export default FormikAutocomplete;
