import React from 'react';
import PropTypes from 'prop-types';

import User from '../User';

const Users = (props) => {
	const { users } = props;

	return (
		<div>
			<h2>Users:</h2>
			{users.map(({ id, username }) => (
				<User key={id} id={id} name={username} />
			))}
		</div>
	);
};

Users.propTypes = {
	users: PropTypes.array,
};

export default Users;
