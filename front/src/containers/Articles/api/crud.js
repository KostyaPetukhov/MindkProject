import { apiClient } from '../../../config/axios';

export const getAllArticles = async () => {
	return apiClient.get('/articles');
};

export const getArticles = async (pageNumber, articlesPerPage) => {
	return apiClient.get(`/articles?limit=${pageNumber * articlesPerPage}`);
};

export const getArticle = async (id) => {
	return apiClient.get(`/articles/${id}`);
};

export const getArticleComments = async (id) => {
	return apiClient.get(`/articles/${id}/comments`);
};

export const getArticleLikes = async (id) => {
	return apiClient.get(`/articles/${id}/likes`);
};

export const addArticle = async (data) => {
	return apiClient.post('/articles', data);
};

export const editArticle = async (id, data) => {
	return apiClient.put(`/articles/${id}`, data);
};

export const deleteArticle = async (id) => {
	return apiClient.delete(`/articles/${id}`);
};
