import React from 'react';
import PropTypes from 'prop-types';

import Profile from '../Profile';
import UserAvatar from '../UserAvatar';

const UserProfile = (props) => {
	const { profile } = props;

	return (
		<div>
			{profile.map(({ id, username, avatar }) => (
				<UserAvatar key={id} id={id} name={username} avatar={avatar} />
			))}
			{profile.map(({ id, pagename, username, phone, email }) => (
				<Profile
					key={id}
					id={id}
					nickname={pagename}
					name={username}
					phone={phone}
					email={email}
				/>
			))}
		</div>
	);
};

UserProfile.propTypes = {
	profile: PropTypes.array,
};

export default UserProfile;
