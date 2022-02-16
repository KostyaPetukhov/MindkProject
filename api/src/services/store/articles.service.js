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

	addArticle: async (articleData, picture) =>
		db
			.insert({
				articletitle: articleData.articletitle,
				userid: articleData.userid,
				articlecreatedat: articleData.articlecreatedat,
				visibility: articleData.visibility,
				image: picture,
			})
			.into('articles'),

	addArticleImage: async (id, image) =>
		db.update({ image }).from('articles').where({ id }),

	editArticle: async (id, articleData, picture) =>
		db.select().from('articles').where({ id }).update({
			articletitle: articleData.articletitle,
			articleupdatedat: articleData.articleupdatedat,
			visibility: articleData.visibility,
			image: picture,
		}),

	deleteArticle: async (id) =>
		db.select().from('articles').where({ id }).del(),
};
