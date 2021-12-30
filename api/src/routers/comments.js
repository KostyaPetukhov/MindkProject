const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
	const comments = await db.select().from('comments').orderBy('id');
	res.status(200).json(comments);
});

router.get('/:id', async (req, res) => {
	const comment = await db
		.select()
		.from('comments')
		.where({ id: req.params.id });
	res.status(200).json(comment);
});

router.post('/', async (req, res) => {
	await db.insert(req.body).into('comments');
	res.status(201).send('Created new comment!');
});

router.put('/:id', async (req, res) => {
	await db
		.select()
		.from('comments')
		.where({ id: req.params.id })
		.update(req.body);
	res.status(200).send('Comment updated!');
});

router.delete('/:id', async (req, res) => {
	await db.select().from('comments').where({ id: req.params.id }).del();
	res.status(200).send('Comment deleted!');
});

module.exports = router;
