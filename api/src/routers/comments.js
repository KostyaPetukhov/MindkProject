const router = require('express').Router();
// const db = require('../services/db');

let comments = [
	{
		id: 1,
		name: 'Good job',
	},
	{
		id: 2,
		name: 'See you again',
	},
];

router.get('/', function (req, res) {
	res.send(comments);
});

router.post('/', function (req, res) {
	console.log(req.body);
	res.send('post data');
});

module.exports = router;
