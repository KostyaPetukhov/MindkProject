import { apiClient } from '../../../config/axios';

const getActicles = async () => {
	return apiClient.get('/articles');
};

export default getActicles;
