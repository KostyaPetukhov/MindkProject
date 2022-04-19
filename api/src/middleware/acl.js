const ForbiddenException = require('../errors/ForbiddenException');
const userService = require('../services/store/users.service');
const aclConfig = require('../services/acl.config');

module.exports = (rule) => async (req, res, next) => {
	const rules = Array.isArray(rule) ? rule : [rule];

	let isAllow = false;
	const getUserById = await userService.getUser(req.auth.id);
	const user = getUserById[0];

	if (user) {
		for await (const checkRule of rules) {
			if (
				aclConfig.aclRules[user.role] &&
				aclConfig.aclRules[user.role][checkRule.resource]
			) {
				for await (const permission of aclConfig.aclRules[user.role][
					checkRule.resource
				]) {
					const canUseAnyAction =
						permission.possesion === aclConfig.Possesion.ANY &&
						permission.action === checkRule.action;

					if (checkRule.possesion === aclConfig.Possesion.ANY) {
						if (canUseAnyAction) {
							isAllow = true;
							return next();
						}
					} else if (canUseAnyAction) {
						isAllow = true;
						return next();
					} else {
						const resource = await checkRule.getResource(req);
						if (checkRule.isOwn(resource[0], user.id)) {
							isAllow = true;
						}
					}
				}
			}
		}
	}

	if (isAllow) {
		return next();
	}

	return next(new ForbiddenException());
};
