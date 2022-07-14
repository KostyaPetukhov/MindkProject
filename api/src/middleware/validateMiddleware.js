/* eslint-disable max-len */
/* eslint-disable default-case */
/* eslint-disable radix */
/* eslint-disable no-case-declarations */
const UnprocessableEntityException = require('../errors/UnprocessableEntityException');
const db = require('../services/db');

// eslint-disable-next-line consistent-return
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
				case 'email':
					const validEmail =
						/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
					if (!validEmail.test(req.body[field])) {
						fieldErrors.push('This is not valid email');
					}
					break;
				case 'min':
					const minValue = parseInt(ruleParam);
					if (req.body[field] && req.body[field].length < minValue) {
						fieldErrors.push(
							`This field  minimum length = ${minValue}`
						);
					}
					break;
				case 'max':
					const maxValue = parseInt(ruleParam);
					if (req.body[field] && req.body[field].length > maxValue) {
						fieldErrors.push(
							`This field  maximum length = ${maxValue}`
						);
					}
					break;
				case 'unique':
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
				case 'regex':
					if (!req.body[field].match(ruleParam)) {
						fieldErrors.push(
							'This field must be regular expression'
						);
					}

					break;
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

	next(new UnprocessableEntityException(errors));
};
