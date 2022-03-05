const UnathorizedException = require('../errors/UnathorizedException');
const ForbiddenException = require('../errors/ForbiddenException');

module.exports = (err, req, res, next) => {
	console.log(err);
	if (err instanceof UnathorizedException) {
		res.status(401).send('Unauthorized');
	} else if (err instanceof ForbiddenException) {
		res.status(403).send('Forbidden');
	}
	res.status(500).send('Ooops, something went wrong..');
	next();
};
