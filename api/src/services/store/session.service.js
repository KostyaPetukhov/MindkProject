const db = require('../db');

module.exports = {
	create: (session) => db('sessions').insert(session),
	getByToken: (token) =>
		db.select().first().where({ token }).from('sessions'),
	deleteByToken: (token) => db('sessions').where({ token }).del(),
	deleteAllTokens: (userid) => db('sessions').where({ userid }).del(),
};
