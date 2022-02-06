import React from 'react';
import PropTypes from 'prop-types';

import Profile from '../Profile';

const UserProfile = (props) => {
	const { profile } = props;

	return (
		<div>
			{profile.map(({ id, pagename, username, phone, email, avatar }) => (
				<Profile
					key={id}
					id={id}
					nickname={pagename}
					name={username}
					phone={phone}
					email={email}
					avatar={avatar}
				/>
			))}
		</div>
	);
};

UserProfile.propTypes = {
	profile: PropTypes.array,
};

export default UserProfile;
