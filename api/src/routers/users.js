const router = require('express').Router();
const path = require('path');
const fileMiddleware = require('../middleware/file');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const userService = require('../services/store/users.service');

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
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;
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
