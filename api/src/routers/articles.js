const router = require('express').Router();
const articlesService = require('../services/store/articles.service');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const authMiddleware = require('../middleware/auth');

router.get(
	'/',
	asyncErrorHandler(async (req, res) => {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const offset = (page - 1) * limit;

		const articles = await articlesService.getAllArticles(limit, offset);
		if (articles && Object.keys(articles).length) {
			res.status(200).send(articles);
		} else {
			res.status(404).send('Aricles not found');
		}
	})
);

router.get(
	'/:id',
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const article = await articlesService.getArticle(id);
		if (article && Object.keys(article).length) {
			res.status(200).send(article);
		} else {
			res.status(404).send('Aricle not found');
		}
	})
);

router.get(
	'/:articleid/comments',
	asyncErrorHandler(async (req, res) => {
		const articleid = req.params.articleid;
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const offset = (page - 1) * limit;

		const articleComments = await articlesService.getArticleComments(
			articleid,
			limit,
			offset
		);
		if (articleComments && Object.keys(articleComments).length) {
			res.status(200).send(articleComments);
		}
	})
);

router.get(
	'/:articleid/likes',
	asyncErrorHandler(async (req, res) => {
		const articleid = req.params.articleid;

		const articleLikes = await articlesService.getArticlesLikes(articleid);
		if (articleLikes && Object.keys(articleLikes).length) {
			res.status(200).send(articleLikes);
		} else {
			res.status(404).send('Likes not found');
		}
	})
);

router.post(
	'/',
	authMiddleware,
	asyncErrorHandler(async (req, res) => {
		const articleData = req.body;
		const userid = req.auth.id;

		const addArticle = await articlesService.addArticle(
			articleData,
			userid
		);

		if (addArticle && Object.keys(addArticle).length) {
			res.status(201).send('Created new article');
		} else {
			res.status(404).send('Not found');
		}
	})
);

router.put(
	'/:id',
	authMiddleware,

	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;
		const articleData = req.body;

		const editArticle = await articlesService.editArticle(id, articleData);
		if (editArticle) {
			res.status(200).send('Article updated!');
		} else {
			res.status(404).send('Article not found');
		}
	})
);

router.delete(
	'/:id',
	authMiddleware,
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const deleteArticle = await articlesService.deleteArticle(id);
		if (deleteArticle) {
			res.status(200).send('Article deleted!');
		} else {
			res.status(404).send('Article not found');
		}
	})
);

module.exports = router;
