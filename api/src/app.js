const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./services/db');
const path = require('path');
const passport = require('passport');

const config = require('./services/config');
const usersRoutes = require('./routers/users');
const articlesRoutes = require('./routers/articles');
const commentsRoutes = require('./routers/comments');
const likesRoutes = require('./routers/likes');
const universRoutes = require('./routers/universities');
const authRoutes = require('./routers/auth');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
require('./domain/google.strategy');
require('./domain/facebook.strategy');

const app = express();

const host = config.host;
const port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(passport.initialize());

app.use(
	loggerMiddleware({
		logTableName: 'logs',
		db,
	})
);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/articles', articlesRoutes);
app.use('/comments', commentsRoutes);
app.use('/likes', likesRoutes);
app.use('/univers', universRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening at http://${host}:${port}`);
});
