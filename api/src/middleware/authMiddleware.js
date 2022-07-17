const jwt = require('jsonwebtoken');
const config = require('../services/config');
const UnauthorizedException = require('../errors/UnathorizedException');

module.exports = async (req, res, next) => {
	console.log('reqHeaders:', req.headers);
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(' ')[1];
		let decoded;
		try {
			decoded = await new Promise((resolve, reject) => {
				jwt.verify(token, config.appKey, (err, result) => {
					if (err) {
						return reject(err);
					}
					return resolve(result);
				});
			});
		} catch (e) {
			console.log(e);
		}
		if (decoded) {
			// eslint-disable-next-line no-param-reassign
			req.auth = decoded;
			return next();
		}
	}

	return next(new UnauthorizedException());
};
