const db = require('../db');

module.exports = {
	getAllLikes: async (limit, offset) =>
		db
			.select()
			.from('likes')
			.limit(limit)
			.offset(offset)
			.orderBy('id', 'desc'),

	getLike: async (id) =>
		db.select().from('likes').where({ id }).orderBy('id'),

	addLike: async (like) => db.insert(like).into('likes'),

	deleteLike: async (id) => db.select().from('likes').where({ id }).del(),
};
