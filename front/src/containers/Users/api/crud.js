import { apiClient } from '../../../config/axios';

const getUsers = async () => {
	return apiClient.get('/users');
};

export default getUsers;
