const router = require('express').Router();
const likesServices = require('../services/store/likes.services');

router.get('/', async (req, res) => {
	const limit = req.query.limit || 10;
	const page = req.query.page || 1;
	const offset = (page - 1) * limit;

	try {
		const likes = await likesServices.getAllLikes(limit, offset);
		if (likes && Object.keys(likes).length) {
			res.status(200).send(likes);
		} else {
			res.status(404).send('Likes not found');
		}
	} catch (e) {
		res.status(500).send('Likes fetching error');
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const like = await likesServices.getLike(id);
		if (like && Object.keys(like).length) {
			res.status(200).send(like);
		} else {
			res.status(404).send('Likes not found');
		}
	} catch (e) {
		res.status(500).send('Likes fetching error');
	}
});

router.post('/', async (req, res) => {
	const like = req.body;
	try {
		const addLike = await likesServices.addLike(like);
		if (addLike && Object.keys(addLike).length) {
			res.status(201).send('Add like');
		} else {
			res.status(404).send('Not found');
		}
	} catch (e) {
		res.status(500).send('Like is not added');
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const deleteLike = await likesServices.deleteLike(id);
		if (deleteLike) {
			res.status(200).send('Like deleted!');
		} else {
			res.status(404).send('Like not found');
		}
	} catch (e) {
		res.status(500).send('Like is not deleted');
	}
});

module.exports = router;
