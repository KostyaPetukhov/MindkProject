const config = require('./config');

module.exports = require('knex')({
	client: 'pg',
	connection: {
		host: config.host,
		user: config.dbUser,
		password: config.dbPassword,
		database: config.dbDatabase,
	},
});
