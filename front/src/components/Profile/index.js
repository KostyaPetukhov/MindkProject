import React from 'react';

import './style.css';
import ProfilePropTypes from '../../PropTypes/ProfilePropTypes';

const Profile = (props) => {
	const { fullName, birth, email, phone } = props;

	return (
		<div>
			<div className='userProfile'>
				<p className='userName'>{fullName}</p>
				<p className='field'> Birthday: {birth}</p>
				<p className='field'> Email: {email}</p>
				<p className='field'> Phone number: {phone}</p>
			</div>
		</div>
	);
};

Profile.propTypes = ProfilePropTypes;

export default Profile;
