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

export const addUserAvatar = async (id, data) => {
	return apiClient.post(`/users/${id}/avatar`, data, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
};

export const getUniversities = async () => {
	return apiClient.get('/univers');
};
