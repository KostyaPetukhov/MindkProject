const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('../services/config');

const userService = require('../services/store/users.service');
const sessionService = require('../services/store/session.service');

module.exports = {
	refresh: async (refreshToken) => {
		const session = await sessionService.getByToken(refreshToken);
		console.log(session);
		if (session) {
			const user = await userService.getUserById(session.userid);

			const accessToken = jwt.sign(
				{ id: user.id, username: user.username, avatar: user.avatar },
				config.appKey,
				{
					expiresIn: config.tokenExpiresIn,
				}
			);

			// eslint-disable-next-line no-shadow
			const refreshToken = uuidv4();
			await sessionService.deleteByToken(session.token);
			await sessionService.create({
				userid: session.userid,
				token: refreshToken,
			});
			return { accessToken, refreshToken };
		}
		return {};
	},
	authorizeById: async (id) => {
		const user = await userService.getUserById(id);

		if (user) {
			const accessToken = jwt.sign(
				{ id: user.id, username: user.username, avatar: user.avatar },
				config.appKey,
				{
					expiresIn: config.tokenExpiresIn,
				}
			);

			const refreshToken = uuidv4();
			await sessionService.create({
				userid: id,
				token: refreshToken,
			});
			return { accessToken, refreshToken };
		}
		return {};
	},
	logout: async (token) => {
		await sessionService.deleteByToken(token);
	},
	getByToken: async (token) => {
		const session = await sessionService.getByToken(token);

		return session;
	},
};
