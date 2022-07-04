import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

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

	const [authData, setAuthData] = useState({
		isAuth: false,
	});

	const contextValue = useMemo(() => ({ authData, setAuthData }), [authData]);
	console.log('context', contextValue);

	const routes = [
		{
			path: '/',
			component: GuestPage,
		},

		{
			path: '/articles',
			component: ArticlesContainer,
		},
		{
			path: '/users',
			component: UsersContainer,
		},
		{
			path: '/users/:id',
			component: UserProfileContainer,
		},
		{
			path: '*',
			component: PageNotFound,
		},
	];

	return (
		<div className='App'>
			<authContext.Provider value={contextValue}>
				<ErrorBoundary>
					<Header />
				</ErrorBoundary>
				<Routes>
					{routes.map((item, index) => {
						const Component = item.component;
						return (
							<Route
								key={index}
								path={item.path}
								element={
									<ErrorBoundary>
										<Component />
									</ErrorBoundary>
								}
							/>
						);
					})}
				</Routes>
			</authContext.Provider>
		</div>
	);
}

export default App;
