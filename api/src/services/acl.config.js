const Action = {
	READ: 'read',
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete',
};

const Possesion = {
	ANY: 'any',
	OWN: 'own',
};

const Resources = {
	ARTICLE: 'article',
	COMMENT: 'comment',
	USER: 'user',
};

const Roles = {
	ADMIN: 'admin',
	USER: 'user',
};

const allowAny = [
	{
		action: Action.CREATE,
		possesion: Possesion.ANY,
	},
	{
		action: Action.READ,
		possesion: Possesion.ANY,
	},
	{
		action: Action.UPDATE,
		possesion: Possesion.ANY,
	},
	{
		action: Action.DELETE,
		possesion: Possesion.ANY,
	},
];

const allowOwn = [
	{
		action: Action.CREATE,
		possesion: Possesion.ANY,
	},
	{
		action: Action.READ,
		possesion: Possesion.ANY,
	},
	{
		action: Action.UPDATE,
		possesion: Possesion.OWN,
	},
	{
		action: Action.DELETE,
		possesion: Possesion.OWN,
	},
];

const aclRules = {
	[Roles.ADMIN]: {
		[Resources.USER]: allowAny,
		[Resources.ARTICLE]: allowAny,
		[Resources.COMMENT]: allowAny,
	},
	[Roles.USER]: {
		[Resources.USER]: allowOwn,
		[Resources.ARTICLE]: allowOwn,
		[Resources.COMMENT]: allowOwn,
	},
};

module.exports = {
	Action,
	Possesion,
	Resources,
	Roles,
	allowAny,
	allowOwn,
	aclRules,
};
