import React from 'react';
import PropTypes from 'prop-types';
import { Link, List, ListItemText } from '@mui/material';

const User = (props) => {
	const { name, id } = props;

	return (
		<List>
			<Link underline='hover' href={`/users/${id}`}>
				<ListItemText primary={name} />
			</Link>
		</List>
	);
};

User.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};

export default User;
