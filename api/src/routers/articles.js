const router = require('express').Router();
const articlesService = require('../services/store/articles.service');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const fileMiddleware = require('../middleware/file');
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
		} else {
			res.status(404).send('Comments not found');
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
	fileMiddleware.single('image'),
	asyncErrorHandler(async (req, res) => {
		const articleData = req.body;
		const picture = req.file.path;
		const userid = req.auth.id;

		const addArticle = await articlesService.addArticle(
			articleData,
			picture,
			userid
		);
		if (addArticle && Object.keys(addArticle).length) {
			res.status(201).send('Created new article');
		} else {
			res.status(404).send('Not found');
		}
	})
);

router.post(
	'/:id/image',
	authMiddleware,
	fileMiddleware.single('image'),
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;
		const image = req.file.path;
		const addImage = await articlesService.addArticleImage(id, image);
		if (addImage) {
			res.status(200).send('Image loaded!');
		} else {
			res.status(404).send('Image is not loaded');
		}
	})
);

router.put(
	'/:id',
	authMiddleware,
	fileMiddleware.single('image'),
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;
		const picture = req.file.path;
		const articleData = req.body;

		const editArticle = await articlesService.editArticle(
			id,
			articleData,
			picture
		);
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
