import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { getUserProfile } from '../Users/api/crud';
import Profile from '../../components/Profile';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

const UserProfileContainer = () => {
	const { id } = useParams();
	const { isFetching, isLoadingError, data } = useQuery(`users/${id}`, () =>
		getUserProfile(id)
	);
	const profile = data?.data || [];

	return (
		<>
			{isFetching && <Spinner />}
			{isLoadingError && <ErrorMessage />}
			<Profile userProfile={profile} />
		</>
	);
};

export default UserProfileContainer;
