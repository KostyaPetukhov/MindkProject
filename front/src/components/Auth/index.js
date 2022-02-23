import React, { useEffect, useState, useCallback } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { apiClient } from '../../config/axios';
import { googleClientId } from '../../config/config';
import { facebookClientId } from '../../config/config';

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

const AuthForm = () => {
	const [auth, setAuth] = useState({});

	useEffect(() => {
		const localStorageAuth = localStorage.getItem('auth');
		if (localStorageAuth) {
			setAuth(JSON.parse(localStorageAuth));
		}
	});

	const handleGoogleAuth = useCallback((data) => {
		apiClient
			.post('auth/google', {
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

	if (!auth.user) {
		return (
			<div>
				<GoogleLogin
					clientId={googleClientId}
					buttonText='Sign in with Google'
					onSuccess={handleGoogleAuth}
					onFailure={(error) => {
						console.error(error);
					}}
					cookiePolicy={'single_host_origin'}
				/>
				<FacebookLogin
					appId={facebookClientId}
					autoLoad
					fields='name,email'
					scope='public_profile, user_friends'
					callback={handleFacebookAuth}
					icon='fa-facebook'
				/>
			</div>
		);
	}

	return (
		<div>
			<div>Authorized</div>
			<div>Welcome: {auth.user.username}</div>
		</div>
	);
};

export default AuthForm;
