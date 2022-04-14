const router = require('express').Router();
const universityServices = require('../services/store/universities.services');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const authMiddleware = require('../middleware/auth');

router.get(
	'/',
	asyncErrorHandler(async (req, res) => {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const offset = (page - 1) * limit;

		const universities = await universityServices.getAllUniversities(
			limit,
			offset
		);
		if (universities && Object.keys(universities).length) {
			res.status(200).send(universities);
		} else {
			res.status(404).send('Universities not found');
		}
	})
);

router.get(
	'/:id',
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const university = await universityServices.getUniversity(id);
		if (university && Object.keys(university).length) {
			res.status(200).send(university);
		} else {
			res.status(404).send('University not found');
		}
	})
);

router.post(
	'/',
	authMiddleware,
	asyncErrorHandler(async (req, res) => {
		const university = req.body;

		const addUniversity = await universityServices.addUniversity(
			university
		);
		if (addUniversity && Object.keys(addUniversity).length) {
			res.status(201).send('Created new university');
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
		const university = req.body;

		const editUniversity = await universityServices.editUniversity(
			id,
			university
		);
		if (editUniversity) {
			res.status(200).send('University updated!');
		} else {
			res.status(404).send('University not found');
		}
	})
);

router.delete(
	'/:id',
	authMiddleware,
	asyncErrorHandler(async (req, res) => {
		const id = req.params.id;

		const deleteUniversity = await universityServices.deleteUniversity(id);
		if (deleteUniversity) {
			res.status(200).send('University deleted!');
		} else {
			res.status(404).send('University not found');
		}
	})
);

module.exports = router;
