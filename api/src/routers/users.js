const router = require('express').Router();
const path = require('path');
const fileMiddleware = require('../middleware/file');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const userService = require('../services/store/users.service');
const authMiddleware = require('../middleware/auth');
const aclMiddleware = require('../middleware/acl');
const aclConfig = require('../services/acl.config');
const validateMiddleware = require('../middleware/validateMiddleware');

router.get(
	'/',
	asyncErrorHandler(async (req, res) => {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const offset = (page - 1) * limit;

		const users = await userService.getAllUsers(limit, offset);
		if (users && Object.keys(users).length) {
			res.status(200).send(users);
		} else {
			res.status(404).send('Users not found');
		}
	})
);

router.get(
	'/:id',
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const user = await userService.getUser(id);
		if (user && Object.keys(user).length) {
			res.status(200).send(user);
		} else {
			res.status(404).send('User not found');
		}
	})
);

router.get(
	'/:userid/likes',
	asyncErrorHandler(async (req, res) => {
		const userid = req.params.userid;

		const userLikes = await userService.getUserLikes(userid);
		if (userLikes && Object.keys(userLikes).length) {
			res.status(200).send(userLikes);
		}
	})
);

router.get(
	'/:id/avatar',
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const avatar = await userService.getUserAvatar(id);
		const image = avatar.map((x) => x.avatar);
		res.status(200).sendFile(`${image}`, {
			root: path.dirname('../'),
		});
	})
);

router.post(
	'/:id/avatar',
	authMiddleware,
	fileMiddleware.single('avatar'),
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;
		const image = req.file.path;
		const addAvatar = await userService.addUserAvatar(id, image);
		if (addAvatar) {
			res.status(200).send('Avatar updated!');
		} else {
			res.status(404).send('Avatar is not updated');
		}
	})
);

router.post(
	'/',
	authMiddleware,
	validateMiddleware(
		{
			id: { requred: true },
			email: { email: true, unique: true },
			phone: {
				regex: /^\+[0-9]{3}\d{9}$/g,
				required: true,
				unique: true,
			},
			username: { min: 2, max: 255, required: true },
		},
		{
			email: {
				tableName: 'users',
				fieldName: 'email',
			},
			phone: {
				tableName: 'users',
				fieldName: 'phone',
			},
		}
	),
	asyncErrorHandler(async (req, res) => {
		const userProfile = req.body;

		const addUser = await userService.addUser(userProfile);
		if (addUser && Object.keys(addUser).length) {
			res.status(201).send('Created new user');
		} else {
			res.status(404).send('Not found');
		}
	})
);

router.put(
	'/:id',
	authMiddleware,
	aclMiddleware([
		{
			resource: aclConfig.Resources.USER,
			action: aclConfig.Action.UPDATE,
			possesion: aclConfig.Possesion.OWN,
			getResource: (req) => userService.getUser(req.params.id),
			isOwn: (resource, userId) => resource.id === userId,
		},
	]),
	validateMiddleware(
		{
			id: { requred: true },
			email: { email: true, unique: true },
			phone: {
				regex: /^\+[0-9]{3}\d{9}$/g,
				unique: true,
				required: true,
			},
			username: { min: 2, max: 255, required: true },
		},
		{
			email: {
				tableName: 'users',
				fieldName: 'email',
				id: 'id',
			},
			phone: {
				tableName: 'users',
				fieldName: 'phone',
				id: 'id',
			},
		}
	),
	asyncErrorHandler(async (req, res) => {
		const id = req.auth.id;
		const userProfile = req.body;

		const editUser = await userService.editUser(id, userProfile);
		if (editUser) {
			res.status(200).send('User updated!');
		} else {
			res.status(404).send('User not found');
		}
	})
);

router.delete(
	'/:id',
	authMiddleware,
	aclMiddleware([
		{
			resource: aclConfig.Resources.USER,
			action: aclConfig.Action.DELETE,
			possesion: aclConfig.Possesion.ANY,
			getResource: (req) => userService.getUser(req.params.id),
			isOwn: (resource, userId) => resource.id === userId,
		},
	]),
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const deleteUser = await userService.deleteUser(id);
		if (deleteUser) {
			res.status(200).send('User deleted!');
		} else {
			res.status(404).send('User not found');
		}
	})
);

module.exports = router;
