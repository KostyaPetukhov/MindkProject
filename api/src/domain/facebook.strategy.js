const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('../services/config');
const userService = require('../services/store/users.service');

passport.use(
	new FacebookTokenStrategy(
		{
			clientID: config.facebookClientId,
			clientSecret: config.facebookClientSecret,
		},

		async (accessToken, refreshToken, profile, done) => {
			const [{ value: email }] = profile.emails;
			let user = await userService.getUserByEmail(email);
			console.log(user);
			if (!user) {
				await userService.addUser({
					username: profile.displayName,
					email,
				});
				user = await userService.getUserByEmail(email);
			}
			return done(null, {
				id: user.id,
				username: user.username,
				email: user.email,
			});
		}
	)
);

module.exports = passport;
