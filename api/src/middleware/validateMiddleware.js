const UnprocessableEntityException = require('../errors/UnprocessableEntityException');
const db = require('../services/db');

module.exports = (validationRules, params) => async (req, res, next) => {
	const errors = {};

	for await (const field of Object.keys(validationRules)) {
		const fieldErrors = [];
		const rules = validationRules[field];

		for await (const rule of Object.entries(rules)) {
			const [ruleName, ruleParam] = rule;

			switch (ruleName) {
				case 'required':
					if (!req.body[field]) {
						fieldErrors.push('This is required field');
					}
					break;
				case 'email': {
					const validEmail =
						/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
					if (!validEmail.test(req.body[field])) {
						fieldErrors.push('This is not valid email');
					}
					break;
				}
				case 'min':
					{
						const minValue = parseInt(ruleParam, 10);
						if (
							req.body[field] &&
							req.body[field].length < minValue
						) {
							fieldErrors.push(
								`This field  minimum length = ${minValue}`
							);
						}
					}
					break;
				case 'max': {
					const maxValue = parseInt(ruleParam, 10);
					if (req.body[field] && req.body[field].length > maxValue) {
						fieldErrors.push(
							`This field  maximum length = ${maxValue}`
						);
					}
					break;
				}
				case 'unique': {
					let originalResource;
					if (params[field].id) {
						originalResource = await db
							.select()
							.first()
							.where(params[field].id, req.params.id)
							.from(params[field].tableName);
					}
					const resource = await db
						.select()
						.first()
						.where(params[field].fieldName, req.body[field])
						.from(params[field].tableName);
					if (
						resource &&
						(!originalResource ||
							resource.id !== originalResource.id)
					) {
						fieldErrors.push('This field must be unique');
					}
					break;
				}
				case 'regex':
					if (!req.body[field].match(ruleParam)) {
						fieldErrors.push(
							'This field must be regular expression'
						);
					}

					break;
				// no default
			}

			console.log(rule);
		}

		if (fieldErrors.length !== 0) {
			errors[field] = fieldErrors;
		}
	}

	if (Object.keys(errors).length === 0) {
		return next();
	}

	return next(new UnprocessableEntityException(errors));
};
