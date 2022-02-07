const router = require('express').Router();
const commentServices = require('../services/store/comments.services');

router.get('/', async (req, res) => {
	const limit = req.query.limit || 10;
	const page = req.query.page || 1;
	const offset = (page - 1) * limit;

	try {
		const comments = await commentServices.getAllComments(limit, offset);
		if (comments && Object.keys(comments).length) {
			res.status(200).send(comments);
		} else {
			res.status(404).send('Comments not found');
		}
	} catch (e) {
		res.status(500).send('Comments fetching error');
	}
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const comment = await commentServices.getComment(id);
		if (comment && Object.keys(comment).length) {
			res.status(200).send(comment);
		} else {
			res.status(404).send('Comment not found');
		}
	} catch (e) {
		res.status(500).send('Comments fetching error');
	}
});

router.post('/', async (req, res) => {
	const comment = req.body;
	try {
		const addComment = await commentServices.addComment(comment);
		if (addComment && Object.keys(addComment).length) {
			res.status(201).send('Created new comment');
		} else {
			res.status(404).send('Not found');
		}
	} catch (e) {
		res.status(500).send('Comment is not added');
	}
});

router.put('/:id', async (req, res) => {
	const id = req.params.id;
	const comment = req.body;
	try {
		const editComment = await commentServices.editComment(id, comment);
		if (editComment) {
			res.status(200).send('Comment updated!');
		} else {
			res.status(404).send('Comment not found');
		}
	} catch (e) {
		res.status(500).send('Comment is not updated');
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const deleteComment = await commentServices.deleteComment(id);
		if (deleteComment) {
			res.status(200).send('Comment deleted!');
		} else {
			res.status(404).send('Comment not found');
		}
	} catch (e) {
		res.status(500).send('Comment is not deleted');
	}
});

module.exports = router;
