import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import UserProfile from '../../components/UserProfile';
import getUserProfile from './api/crud';

const UserProfileContainer = () => {
	const { id } = useParams();
	const { isFetching, data } = useQuery(`users/${id}`, () =>
		getUserProfile(id)
	);

	const profile = data?.data || [];

	return (
		<div>
			{isFetching && <div>Loading..</div>}
			<UserProfile profile={profile} />
		</div>
	);
};

export default UserProfileContainer;
