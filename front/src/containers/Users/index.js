import React from 'react';
import { useQuery } from 'react-query';

import Users from '../../components/Users';
import { getUsers } from './api/crud';

const UsersContainer = () => {
	const { isFetching, data } = useQuery('user', () => getUsers());
	const users = data?.data || [];

	return (
		<div>
			{isFetching && <div>Loading..</div>}
			<Users users={users} />
		</div>
	);
};

export default UsersContainer;
