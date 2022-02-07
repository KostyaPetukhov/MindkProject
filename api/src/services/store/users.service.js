const db = require('../db');

module.exports = {
	getAllUsers: async (limit, offset) =>
		db.select().from('users').limit(limit).offset(offset).orderBy('id'),

	getUser: async (id) =>
		db.select().from('users').where({ id }).orderBy('id'),

	addUser: async (userProfile) => db.insert(userProfile).into('users'),

	getUserAvatar: async (id) =>
		db.select('avatar').from('users').where({ id }),

	addUserAvatar: async (id, avatar) =>
		db.update({ avatar }).from('users').where({ id }),

	editUser: async (id, userProfile) =>
		db.select().from('users').where({ id }).update(userProfile),

	deleteUser: async (id) => db.select().from('users').where({ id }).del(),
};
