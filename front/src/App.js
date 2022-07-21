import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

import Header from './components/Header';
import ArticlesContainer from './containers/Articles';
import UsersContainer from './containers/Users';
import UserProfileContainer from './containers/Profile';
import ErrorBoundary from './components/ErrorBoundary';
import PageNotFound from './components/PageNotFound';
import authContext from './authContext';
import GuestPage from './components/GuestPage';
import './App.css';

function App() {
	useEffect(() => {
		window.process = {
			...window.process,
		};
	}, []);

	const [authData, setAuthData] = useState({ isAuth: false });
	const localStorageData = JSON.parse(localStorage.getItem('auth'));

	useEffect(() => {
		if (localStorageData) {
			setAuthData({
				isAuth: localStorageData.isAuth,
				userId: localStorageData.user.id,
				userName: localStorageData.user.username,
				userAvatar: localStorageData.user.avatar,
			});
		}
	}, []);

	const contextValue = useMemo(() => ({ authData, setAuthData }), [authData]);

	return (
		<div className='App'>
			<authContext.Provider value={contextValue}>
				<ErrorBoundary>
					<Header />
					<Routes>
						<Route
							path='/'
							element={<Navigate to='/articles' replace />}
						/>
						<Route
							element={<ProtectedRoute auth={authData.isAuth} />}
						>
							<Route
								path='/articles'
								element={<ArticlesContainer />}
							/>
							<Route path='/users' element={<UsersContainer />} />
							<Route
								path='/users/:id'
								element={<UserProfileContainer />}
							/>
						</Route>
						<Route element={<GuestRoute auth={authData.isAuth} />}>
							<Route path='/login' element={<GuestPage />} />
						</Route>
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</ErrorBoundary>
			</authContext.Provider>
		</div>
	);
}

export default App;
