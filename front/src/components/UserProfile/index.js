import React from 'react';
import PropTypes from 'prop-types';

import Profile from '../Profile';

const UserProfile = (props) => {
	const { profile } = props;

	return (
		<div>
			{profile.map(({ id, username, phone, email }) => (
				<Profile key={id} name={username} phone={phone} email={email} />
			))}
		</div>
	);
};

UserProfile.propTypes = {
	profile: PropTypes.array,
};

export default UserProfile;
