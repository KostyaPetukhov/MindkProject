import { apiClient } from '../../../config/axios';

export const getAllComments = async () => {
	return apiClient.get('/comments');
};

export const getComment = async (id) => {
	return apiClient.get(`/comments/${id}`);
};

export const addComment = async (data) => {
	return apiClient.post('/comments', data);
};

export const editComment = async (id, data) => {
	return apiClient.put(`/comments/${id}`, data);
};

export const deleteComment = async (id) => {
	return apiClient.delete(`/comments/${id}`);
};
