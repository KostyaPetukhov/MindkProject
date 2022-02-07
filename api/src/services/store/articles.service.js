const db = require('../db');

module.exports = {
	getAllArticles: async (limit, offset) =>
		db.select().from('articles').limit(limit).offset(offset).orderBy('id'),

	getArticle: async (id) =>
		db.select().from('articles').where({ id }).orderBy('id'),

	getArticleComments: async (articleid, limit, offset) =>
		db
			.select()
			.from('comments')
			.where({ articleid })
			.limit(limit)
			.offset(offset),

	getArticlesLikes: async (articleid) =>
		db.select().from('likes').where({ articleid }),

	addArticle: async (articleData) => db.insert(articleData).into('articles'),

	editArticle: async (id, articleData) =>
		db.select().from('articles').where({ id }).update(articleData),

	deleteArticle: async (id) =>
		db.select().from('articles').where({ id }).del(),
};
