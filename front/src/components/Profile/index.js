import React from 'react';

import './style.css';

const Profile = () => {
	const profile = {
		fullName: 'Andrey Vorobey',
		birth: '19.07.1996',
		email: 'andrew142@gmail.com',
		phone: '+380967436789',
	};

	return (
		<div>
			<div className='userProfile'>
				<p className='userName'>{profile.fullName}</p>
				<p className='field'> Birthday: {profile.birth}</p>
				<p className='field'> Email: {profile.email}</p>
				<p className='field'> Phone number: {profile.phone}</p>
			</div>
		</div>
	);
};

export default Profile;
