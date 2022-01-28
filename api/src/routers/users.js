const router = require('express').Router();
const path = require('path');
const fileMiddleware = require('../middleware/file');
const db = require('../services/db');

router.get('/', async (req, res) => {
	const users = await db.select().from('users').orderBy('id');
	res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
	const user = await db.select().from('users').where({ id: req.params.id });
	res.status(200).json(user);
});

router.get('/:id/avatar', async (req, res) => {
	const avatar = await db
		.select('avatar')
		.from('users')
		.where({ id: req.params.id });
	const image = avatar.map((x) => x.avatar);
	res.status(200).sendFile(`${image}`, {
		root: path.dirname('../'),
	});
});

router.post(
	'/:id/avatar',
	fileMiddleware.single('avatar'),
	async (req, res) => {
		try {
			if (req.file) {
				await db
					.update({ avatar: req.file.path })
					.from('users')
					.where({ id: req.params.id })
					.then(() => {
						res.status(200).send('Avatar added!');
					});
			}
		} catch (error) {
			res.status(404).send('Avatar is not uploaded');
		}
	}
);

router.post('/', async (req, res) => {
	await db.insert(req.body).into('users');
	res.status(201).send('Created new user!');
});

router.put('/:id', async (req, res) => {
	await db
		.select()
		.from('users')
		.where({ id: req.params.id })
		.update(req.body);
	res.status(200).send('User updated!');
});

router.delete('/:id', async (req, res) => {
	await db.select().from('users').where({ id: req.params.id }).del();
	res.status(200).send('User deleted!');
});

module.exports = router;
