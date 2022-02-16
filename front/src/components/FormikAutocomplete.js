import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { fieldToTextField } from 'formik-mui';

const FormikAutocomplete = (props) => {
	const {
		form: { setTouched, setFieldValue },
	} = props;
	const { error, helperText, ...field } = fieldToTextField(props);
	const { name } = field;

	return (
		<Autocomplete
			{...props}
			{...field}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			getOptionLabel={(option) => (option.label ? option.label : 'All')}
			onChange={(_, value) => setFieldValue(name, value)}
			onBlur={() => setTouched({ [name]: true })}
			renderInput={(props) => (
				<TextField
					{...props}
					helperText={helperText}
					error={error}
					label='Visible to'
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
