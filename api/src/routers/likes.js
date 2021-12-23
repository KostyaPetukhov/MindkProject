const router = require('express').Router();
// const db = require('../services/db');

let likes = [
	{
		id: 1,
		name: 'Like!',
	},
	{
		id: 2,
		name: 'Like!',
	},
];

router.get('/', function (req, res) {
	res.send(likes);
});

router.post('/', function (req, res) {
	console.log(req.body);
	res.send('post data');
});

module.exports = router;
