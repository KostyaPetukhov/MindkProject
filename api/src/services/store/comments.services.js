const db = require('../db');

module.exports = {
	getAllComments: async (limit, offset) =>
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
			.limit(limit)
			.offset(offset)
			.orderBy('c.commentcreatedat', 'desc'),

	getComment: async (id) =>
		db('comments as c')
			.select(
				'c.id',
				'c.articleid',
				'c.userid',
				'c.commentanswerid',
				'c.commenttitle',
				'c.commentcreatedat',
				'c.commentupdatedat',
				'u.username as user'
			)
			.leftJoin('users as u', 'c.userid', '=', 'u.id')
			.where('c.id', id)
			.orderBy('c.id'),

	addComment: async (commentData, userid) =>
		db
			.insert({
				commenttitle: commentData.commenttitle,
				userid,
				commentcreatedat: commentData.commentcreatedat,
				articleid: commentData.articleid,
				commentanswerid: commentData.commentanswerid,
			})
			.into('comments'),

	editComment: async (id, comment) =>
		db.select().from('comments').where({ id }).update(comment),

	deleteComment: async (id) =>
		db.select().from('comments').where({ id }).del(),
};
