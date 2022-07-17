const UnathorizedException = require('../errors/UnathorizedException');
const ForbiddenException = require('../errors/ForbiddenException');
const UnprocessableEntityException = require('../errors/UnprocessableEntityException');

module.exports = (err, req, res, next) => {
	console.log(err);
	if (err instanceof UnathorizedException) {
		res.status(401).send('Unauthorized');
	} else if (err instanceof ForbiddenException) {
		res.status(403).send('Forbidden');
	} else if (err instanceof UnprocessableEntityException) {
		res.status(422).send({ errors: err.errors });
	}
	res.status(500).send('Ooops, something went wrong..');
	next();
};
