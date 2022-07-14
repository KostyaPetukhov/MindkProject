const db = require('../db');

module.exports = {
	getAllUsers: async (limit, offset) =>
		db.select().from('users').limit(limit).offset(offset).orderBy('id'),

	getUserById: async (id) => db.select().first().where({ id }).from('users'),

	getUser: async (id) =>
		db.select().from('users').where({ id }).orderBy('id'),

	getUserByEmail: async (email) =>
		db.select().first().where({ email }).from('users'),

	getUserByPhone: async (phone) =>
		db.select().first().where({ phone }).from('users'),

	getUserLikes: async (userid) =>
		db('likes as l')
			.select('l.id', 'l.articleid', 'l.userid')
			.leftJoin('users as u', 'l.userid', '=', 'u.id')
			.where({ userid })
			.orderBy('l.id', 'desc'),

	addUser: async (userProfile) => db.insert(userProfile).into('users'),

	getUserAvatar: async (id) =>
		db.select('avatar').from('users').where({ id }),

	addUserAvatar: async (id, image) =>
		db.update({ avatar: image }).from('users').where({ id }),

	editUser: async (id, userProfile) =>
		db.select().from('users').where({ id }).update(userProfile),

	deleteUser: async (id) => db.select().from('users').where({ id }).del(),
};
