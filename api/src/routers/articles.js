const router = require('express').Router();
const articlesService = require('../services/store/articles.service');

router.get('/', async (req, res) => {
	const limit = req.query.limit || 10;
	const page = req.query.page || 1;
	const offset = (page - 1) * limit;

	try {
		const articles = await articlesService.getAllArticles(limit, offset);
		if (articles && Object.keys(articles).length) {
			res.status(200).send(articles);
		} else {
			res.status(404).send('Aricles not found');
		}
	} catch (e) {
		res.status(500).send('Articles fetching error');
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const article = await articlesService.getArticle(id);
		if (article && Object.keys(article).length) {
			res.status(200).send(article);
		} else {
			res.status(404).send('Aricle not found');
		}
	} catch (e) {
		res.status(500).send('Articles fetching error');
	}
});

router.get('/:articleid/comments', async (req, res) => {
	const articleid = req.params.articleid;
	const limit = req.query.limit || 10;
	const page = req.query.page || 1;
	const offset = (page - 1) * limit;
	try {
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
	} catch (e) {
		res.status(500).send('Comments fetching error');
	}
});

router.get('/:articleid/likes', async (req, res) => {
	const articleid = req.params.articleid;
	try {
		const articleLikes = await articlesService.getArticlesLikes(articleid);
		if (articleLikes && Object.keys(articleLikes).length) {
			res.status(200).send(articleLikes);
		} else {
			res.status(404).send('Likes not found');
		}
	} catch (e) {
		res.status(500).send('Likes fetching error');
	}
});

router.post('/', async (req, res) => {
	const articleData = req.body;
	try {
		const addArticle = await articlesService.addArticle(articleData);
		if (addArticle && Object.keys(addArticle).length) {
			res.status(201).send('Created new article');
		} else {
			res.status(404).send('Not found');
		}
	} catch (e) {
		res.status(500).send('Article is not added');
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const articleData = req.body;
	try {
		const editArticle = await articlesService.editArticle(id, articleData);
		if (editArticle) {
			res.status(200).send('Article updated!');
		} else {
			res.status(404).send('Article not found');
		}
	} catch (e) {
		res.status(500).send('Article is not updated');
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const deleteArticle = await articlesService.deleteArticle(id);
		if (deleteArticle) {
			res.status(200).send('Article deleted!');
		} else {
			res.status(404).send('Article not found');
		}
	} catch (e) {
		res.status(500).send('Article is not deleted');
	}
});

module.exports = router;
