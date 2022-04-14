const db = require('../db');

module.exports = {
	getAllUniversities: async (limit, offset) =>
		db
			.select()
			.from('universities')
			.limit(limit)
			.offset(offset)
			.orderBy('id'),

	getUniversity: async (id) =>
		db.select().from('universities').where({ id }).orderBy('id'),

	addUniversity: async (university) =>
		db.insert(university).into('universities'),

	editUniversity: async (id, university) =>
		db.select().from('universities').where({ id }).update(university),

	deleteUniversity: async (id) =>
		db.select().from('universities').where({ id }).del(),
};
