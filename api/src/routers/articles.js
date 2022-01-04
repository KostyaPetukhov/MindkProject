const router = require('express').Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
	const articles = await db.select().from('articles').orderBy('id');
	res.status(200).json(articles);
});

router.get('/:id', async (req, res) => {
	const article = await db
		.select()
		.from('articles')
		.where({ id: req.params.id });
	res.status(200).json(article);
});

router.get('/:articleid/comments', async (req, res) => {
	const articleComments = await db
		.select()
		.from('comments')
		.where({ articleid: req.params.articleid });
	res.status(200).json(articleComments);
});

router.get('/:articleid/likes', async (req, res) => {
	const articleLikes = await db
		.select()
		.from('likes')
		.where({ articleid: req.params.articleid });
	res.status(200).json(articleLikes);
});

router.post('/', async (req, res) => {
	await db.insert(req.body).into('articles');
	res.status(201).send('Created new article!');
});

router.put('/:id', async (req, res) => {
	await db
		.select()
		.from('articles')
		.where({ id: req.params.id })
		.update(req.body);
	res.status(200).send('Article updated!');
});

router.delete('/:id', async (req, res) => {
	await db.select().from('articles').where({ id: req.params.id }).del();
	res.status(200).send('Article deleted!');
});

module.exports = router;
