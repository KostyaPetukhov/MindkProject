import React from 'react';

import './style.css';
import ProfilePropTypes from '../../PropTypes/ProfilePropTypes';

const Profile = (props) => {
	const { name, email, phone } = props;

	return (
		<div>
			<div className='userProfile'>
				<p className='userName'>{name}</p>
				<p className='field'> Email: {email}</p>
				<p className='field'> Phone number: {phone}</p>
			</div>
		</div>
	);
};

Profile.propTypes = ProfilePropTypes;

export default Profile;
