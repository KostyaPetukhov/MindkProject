const db = require('../db');

module.exports = {
	getAllArticles: async (limit, offset) =>
		db('articles as a')
			.select(
				'a.id',
				'a.articletitle',
				'a.articlecreatedat',
				'a.articleupdatedat',
				'a.visibility',
				'u.username as user',
				'u.id as authorId',
				'u.avatar as avatar'
			)
			.leftJoin('users as u', 'a.userid', '=', 'u.id')
			.limit(limit)
			.offset(offset)
			.orderBy(
				'a.articleupdatedat',
				'desc' || 'a.articlecreatedat',
				'desc'
			),

	getArticle: async (id) =>
		db.select().from('articles').where({ id }).orderBy('id'),

	getArticleComments: async (articleid, limit, offset) =>
		db('comments as c')
			.select(
				'c.id',
				'c.commenttitle',
				'c.commentcreatedat',
				'c.commentupdatedat',
				'c.commentanswerid',
				'u.username as user',
				'u.id as userId',
				'u.avatar as avatar'
			)
			.leftJoin('users as u', 'c.userid', '=', 'u.id')
			.where({ articleid })
			.limit(limit)
			.offset(offset)
			.orderBy('commentcreatedat', 'desc'),

	getArticlesLikes: async (articleid) =>
		db('likes as l')
			.select(
				'l.id',
				'l.articleid',
				'l.userid',
				'u.username as user',
				'u.avatar as avatar'
			)
			.leftJoin('users as u', 'l.userid', '=', 'u.id')
			.where({ articleid })
			.orderBy('l.id', 'desc'),

	addArticle: async (articleData, userid) =>
		db
			.insert({
				articletitle: articleData.articletitle,
				userid,
				articlecreatedat: articleData.articlecreatedat,
				visibility: articleData.visibility,
			})
			.into('articles'),

	editArticle: async (id, articleData) =>
		db.select().from('articles').where({ id }).update(articleData),

	deleteArticle: async (id) =>
		db.select().from('articles').where({ id }).del(),
};
