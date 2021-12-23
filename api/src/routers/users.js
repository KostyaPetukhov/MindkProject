const router = require('express').Router();
// const db = require('../services/db');

let users = [
	{
		id: 1,
		name: 'Stariy Vol',
	},
	{
		id: 2,
		name: 'Max Degreement',
	},
	{
		id: 3,
		name: 'Dimas Yarosh ',
	},
];

// router.get('/', async (req, res) => {
// 	// TODO: implement me

// 	res.send(await db.select().from('users').orderBy('id'));
// });

router.get('/', function (req, res) {
	res.send(users);
});

router.post('/', function (req, res) {
	console.log(req.body);
	res.send('post data');
});

module.exports = router;
