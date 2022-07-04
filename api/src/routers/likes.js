const router = require('express').Router();
const likesServices = require('../services/store/likes.services');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const authMiddleware = require('../middleware/auth');

router.get(
	'/',
	asyncErrorHandler(async (req, res) => {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const offset = (page - 1) * limit;

		const likes = await likesServices.getAllLikes(limit, offset);
		if (likes && Object.keys(likes).length) {
			res.status(200).send(likes);
		} else {
			res.status(404).send('Likes not found');
		}
	})
);

router.get(
	'/:id',
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const like = await likesServices.getLike(id);
		if (like && Object.keys(like).length) {
			res.status(200).send(like);
		} else {
			res.status(404).send('Likes not found');
		}
	})
);

router.post(
	'/',
	authMiddleware,
	asyncErrorHandler(async (req, res) => {
		const like = req.body;
		const addLike = await likesServices.addLike({
			...like,
			userid: req.body.userid,
		});
		if (addLike && Object.keys(addLike).length) {
			res.status(201).send('Add like');
		} else {
			res.status(404).send('Not found');
		}
	})
);

router.delete(
	'/:id',
	authMiddleware,
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const deleteLike = await likesServices.deleteLike(id);
		if (deleteLike) {
			res.status(200).send('Like deleted!');
		} else {
			res.status(404).send('Like not found');
		}
	})
);

module.exports = router;
