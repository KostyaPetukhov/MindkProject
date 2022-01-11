import React from 'react';

import './style.css';

const Profile = ({ fullName, birth, email, phone }) => {
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

export default Profile;
