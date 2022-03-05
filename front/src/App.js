import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './containers/Header';
import ArticlesContainer from './containers/Articles';
import UsersContainer from './containers/Users';
import UserProfileContainer from './containers/Profile';
import AddArticle from './components/AddArticle';
import ErrorBoundary from './components/ErrorBoundary';
import authContext from './authContext';
import GuestPage from './components/GuestPage';
import './App.css';

function App() {
	const [userData, setUserData] = useState({
		isAuth: false,
		user: null,
		setUserData: () => {},
	});

	const changeContext = () => {
		setUserData({
			isAuth: true,
			user: {
				id: 1,
				name: 'Kostya Petukhov',
				email: 'kostya3241@gmail.com',
			},
			setUserData,
		});
	};

	return (
		<div className='App'>
			<authContext.Provider value={userData}>
				<ErrorBoundary>
					<Header />
				</ErrorBoundary>
				<Routes>
					<Route
						path='/'
						element={
							<ErrorBoundary>
								<GuestPage />
							</ErrorBoundary>
						}
					/>
					<Route
						path='/context'
						element={
							<div>
								Home Page
								<button onClick={changeContext}>
									Change context
								</button>
							</div>
						}
					/>
					<Route
						path='/article'
						element={
							<ErrorBoundary>
								<AddArticle />
							</ErrorBoundary>
						}
					/>
					<Route
						path='/articles'
						element={
							<ErrorBoundary>
								<ArticlesContainer />
							</ErrorBoundary>
						}
					/>
					<Route
						path='/users'
						element={
							<ErrorBoundary>
								<UsersContainer />
							</ErrorBoundary>
						}
					/>
					<Route
						path='/users/:id'
						element={
							<ErrorBoundary>
								<UserProfileContainer />
							</ErrorBoundary>
						}
					/>
					<Route path='*' element={<div>Page not found</div>} />
				</Routes>
			</authContext.Provider>
		</div>
	);
}

export default App;
