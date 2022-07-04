import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { apiClient } from '../../config/axios';
import { googleClientId } from '../../config/config';
import { facebookClientId } from '../../config/config';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import authContext from '../../authContext';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	authForm: {
		flexDirection: 'column',
		marginTop: 10,
	},
	paragraph: {
		fontWeight: 400,
		fontSize: '1rem',
		align: 'center',
		letterSpacing: '0.00938em',
		color: 'rgba(0, 0, 0, 0.6)',
	},
	googleLogin: {
		width: 240,
		heigth: 80,
		justifyContent: 'center',
		marginBottom: 30,
	},
}));

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

const AuthForm = () => {
	const [auth, setAuth] = useState({});
	// хранить данные в контексте, этот стейт не нужен
	const classes = useStyles();
	// eslint-disable-next-line no-unused-vars
	const { authData, setAuthData } = useContext(authContext);
	const changeContext = () =>
		setAuthData({
			isAuth: auth.isAuth,
			userId: auth.userId,
			userName: auth.username,
			userAvatar: auth.avatar,
		});

	useEffect(() => {
		const localStorageAuth = localStorage.getItem('auth');
		if (localStorageAuth) {
			setAuth(JSON.parse(localStorageAuth));
		}
	}, []);

	const handleGoogleAuth = useCallback((data) => {
		apiClient
			.post('auth/google', {
				access_token: data.accessToken,
			})
			.then((response) => {
				setAuth({
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
					isAuth: true,
					userId: response.data.userId,
					username: response.data.username,
					avatar: response.data.avatar,
					user: parseJwt(response.data.accessToken),
				});
			})
			.catch((error) => {
				console.log(error);
			});
	});

	const handleFacebookAuth = useCallback((data) => {
		apiClient
			.post(`/auth/facebook`, {
				access_token: data.accessToken,
			})
			.then((response) => {
				setAuth({
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
					user: parseJwt(response.data.accessToken),
				});
			})
			.catch((error) => {
				console.log(error);
			});
	});

	if (!auth.userId) {
		return (
			<>
				<Grid
					className={classes.authForm}
					container
					flexDirection='column'
					alignContent='center'
				>
					<Grid item>
						<Typography
							fontSize={20}
							align='center'
							marginBottom={3}
							className={classes.paragraph}
						>
							Sign in with Google:
						</Typography>

						<GoogleLogin
							className={classes.googleLogin}
							clientId={googleClientId}
							onSuccess={handleGoogleAuth}
							onFailure={(error) => {
								console.error(error);
							}}
							cookiePolicy={'single_host_origin'}
						>
							<Typography fontSize={18} fontWeight={700}>
								Log in with Google
							</Typography>
						</GoogleLogin>
					</Grid>
					<Grid item>
						<Typography
							fontSize={20}
							align='center'
							marginBottom={3}
							className={classes.paragraph}
						>
							Sign in with Facebook:
						</Typography>
						<FacebookLogin
							appId={facebookClientId}
							autoLoad
							fields='name,email'
							scope='public_profile, user_friends'
							callback={handleFacebookAuth}
							icon='fa-facebook'
						/>
					</Grid>
				</Grid>
			</>
		);
	}

	return (
		<>
			{changeContext()}
			<Navigate to='/articles' replace={true} />
		</>
	);
};

export default AuthForm;
