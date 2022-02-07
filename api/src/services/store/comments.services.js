const db = require('../db');

module.exports = {
	getAllComments: async (limit, offset) =>
		db.select().from('comments').limit(limit).offset(offset).orderBy('id'),

	getComment: async (id) =>
		db.select().from('comments').where({ id }).orderBy('id'),

	addComment: async (comment) => db.insert(comment).into('comments'),

	editComment: async (id, comment) =>
		db.select().from('comments').where({ id }).update(comment),

	deleteComment: async (id) =>
		db.select().from('comments').where({ id }).del(),
};
