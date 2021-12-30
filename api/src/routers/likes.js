const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
	const likes = await db.select().from('likes').orderBy('id');
	res.status(200).json(likes);
});

router.get('/:id', async (req, res) => {
	const like = await db.select().from('likes').where({ id: req.params.id });
	res.status(200).json(like);
});

router.post('/', async (req, res) => {
	await db.insert(req.body).into('likes');
	res.status(201).send('Like this article!');
});

router.delete('/:id', async (req, res) => {
	await db.select().from('likes').where({ id: req.params.id }).del();
	res.status(200).send('Like is deleted!');
});

module.exports = router;
