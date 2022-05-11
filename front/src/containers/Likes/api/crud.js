import { apiClient } from '../../../config/axios';

export const getAllLikes = async () => {
	return apiClient.get('/likes');
};

export const getLike = async (id) => {
	return apiClient.get(`/likes/${id}`);
};

export const addLike = async (data) => {
	return apiClient.post('/likes', data);
};

export const deleteLike = async (id) => {
	return apiClient.delete(`/likes/${id}`);
};
