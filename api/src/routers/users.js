const router = require('express').Router();
const path = require('path');
const fileMiddleware = require('../middleware/file');
const userService = require('../services/store/users.service');

router.get('/', async (req, res) => {
	const limit = req.query.limit || 10;
	const page = req.query.page || 1;
	const offset = (page - 1) * limit;

	try {
		const users = await userService.getAllUsers(limit, offset);
		if (users && Object.keys(users).length) {
			res.status(200).send(users);
		} else {
			res.status(404).send('Users not found');
		}
	} catch (e) {
		res.status(500).send('Users fetching error');
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const user = await userService.getUser(id);
		if (user && Object.keys(user).length) {
			res.status(200).send(user);
		} else {
			res.status(404).send('User not found');
		}
	} catch (e) {
		res.status(500).send('User fetching error');
	}
});

router.get('/:id/avatar', async (req, res) => {
	const id = req.params.id;
	const avatar = await userService.getUserAvatar(id);
	const image = avatar.map((x) => x.avatar);
	res.status(200).sendFile(`${image}`, {
		root: path.dirname('../'),
	});
});

router.post(
	'/:id/avatar',
	fileMiddleware.single('avatar'),
	async (req, res) => {
		const id = req.params.id;
		const avatar = req.file.path;
		const addAvatar = await userService.addUserAvatar(id, avatar);
		try {
			if (addAvatar) {
				res.status(200).send('Avatar updated!');
			}
		} catch (e) {
			res.status(500).send('Avatar is not updated');
		}
	}
);

router.post('/', async (req, res) => {
	const userProfile = req.body;
	try {
		const addUser = await userService.addUser(userProfile);
		if (addUser && Object.keys(addUser).length) {
			res.status(201).send('Created new user');
		} else {
			res.status(404).send('Not found');
		}
	} catch (e) {
		res.status(500).send('User is not added');
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const userProfile = req.body;
	try {
		const editUser = await userService.editUser(id, userProfile);
		if (editUser) {
			res.status(200).send('User updated!');
		} else {
			res.status(404).send('User not found');
		}
	} catch (e) {
		res.status(500).send('User is not updated');
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const deleteUser = await userService.deleteUser(id);
		if (deleteUser) {
			res.status(200).send('User deleted!');
		} else {
			res.status(404).send('User not found');
		}
	} catch (e) {
		res.status(500).send('User is not deleted');
	}
});

module.exports = router;
