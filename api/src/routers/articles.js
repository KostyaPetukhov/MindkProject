const router = require('express').Router();
// const db = require('../services/db');

let articles = [
	{
		id: 1,
		name: 'Times',
	},
	{
		id: 2,
		name: 'Days',
	},
];

router.get('/', function (req, res) {
	res.send(articles);
});

router.post('/', function (req, res) {
	console.log(req.body);
	res.send('post data');
});

module.exports = router;
