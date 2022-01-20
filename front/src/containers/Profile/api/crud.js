import { apiClient } from '../../../config/axios';

const getUserProfile = async (id) => {
	return apiClient.get(`/users/${id}`);
};

export default getUserProfile;
