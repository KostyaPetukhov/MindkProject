const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
	const users = await db.select().from('users').orderBy('id');
	res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
	const user = await db.select().from('users').where({ id: req.params.id });
	res.status(200).json(user);
});

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
