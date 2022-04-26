const router = require('express').Router();
const commentServices = require('../services/store/comments.services');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const authMiddleware = require('../middleware/auth');
const aclMiddleware = require('../middleware/acl');
const aclConfig = require('../services/acl.config');

router.get(
	'/',
	asyncErrorHandler(async (req, res) => {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const offset = (page - 1) * limit;

		const comments = await commentServices.getAllComments(limit, offset);
		if (comments && Object.keys(comments).length) {
			res.status(200).send(comments);
		} else {
			res.status(404).send('Comments not found');
		}
	})
);

router.get(
	'/:id',
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const comment = await commentServices.getComment(id);
		if (comment && Object.keys(comment).length) {
			res.status(200).send(comment);
		} else {
			res.status(404).send('Comment not found');
		}
	})
);

router.post(
	'/',
	authMiddleware,
	asyncErrorHandler(async (req, res) => {
		const commentData = req.body;
		const userid = req.auth.id;

		const addComment = await commentServices.addComment(
			commentData,
			userid
		);
		if (addComment && Object.keys(addComment).length) {
			res.status(201).send('Created new comment');
		} else {
			res.status(404).send('Not found');
		}
	})
);

router.put(
	'/:id',
	authMiddleware,
	aclMiddleware([
		{
			resource: aclConfig.Resources.COMMENT,
			action: aclConfig.Action.UPDATE,
			possesion: aclConfig.Possesion.OWN,
			getResource: (req) => commentServices.getComment(req.params.id),
			isOwn: (resource, userId) => resource.userid === userId,
		},
	]),
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;
		const comment = req.body;

		const editComment = await commentServices.editComment(id, comment);
		if (editComment) {
			res.status(200).send('Comment updated!');
		} else {
			res.status(404).send('Comment not found');
		}
	})
);

router.delete(
	'/:id',
	authMiddleware,
	aclMiddleware([
		{
			resource: aclConfig.Resources.COMMENT,
			action: aclConfig.Action.DELETE,
			possesion: aclConfig.Possesion.OWN,
			getResource: (req) => commentServices.getComment(req.params.id),
			isOwn: (resource, userId) => resource.userid === userId,
		},
	]),
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const deleteComment = await commentServices.deleteComment(id);
		if (deleteComment) {
			res.status(200).send('Comment deleted!');
		} else {
			res.status(404).send('Comment not found');
		}
	})
);

module.exports = router;
