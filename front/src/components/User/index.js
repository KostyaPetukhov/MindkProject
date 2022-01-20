import React from 'react';
import { Link } from 'react-router-dom';

import UserPropTypes from '../../PropTypes/UserPropTypes';
import './style.css';

const User = (props) => {
	const { name, id } = props;

	return (
		<div className='usersList'>
			<Link to={`/users/${id}`}>
				<p className='listItem'>{name}</p>
			</Link>
		</div>
	);
};

User.propTypes = UserPropTypes;

export default User;
