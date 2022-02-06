import { apiClient } from '../../../config/axios';

export const getUsers = async () => {
	return apiClient.get('/users');
};

export const getUserProfile = async (id) => {
	return apiClient.get(`/users/${id}`);
};

export const editUserProfile = async (id, data) => {
	return apiClient.put(`/users/${id}`, data);
};
