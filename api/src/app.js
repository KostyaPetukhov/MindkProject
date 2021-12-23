const express = require('express');
const bodyParser = require('body-parser');

const config = require('./services/config');
const usersRoutes = require('./routers/users');
const articlesRoutes = require('./routers/articles');
const commentsRoutes = require('./routers/comments');
const likesRoutes = require('./routers/likes');

const app = express();

const host = config.host;
const port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);
app.use('/comments', commentsRoutes);
app.use('/likes', likesRoutes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening at http://${host}:${port}`);
});
