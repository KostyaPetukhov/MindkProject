import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './containers/Header';
import Article from './components/Article';
import Profile from './components/Profile';
import AddArticle from './components/AddArticle';
import CheckDate from './containers/CheckDate';
import CheckID from './containers/CheckID';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

function App() {
	return (
		<div className='App'>
			<ErrorBoundary>
				<Header />
			</ErrorBoundary>
			<Routes>
				<Route path='/' element={<div>Home Page</div>} />
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
							<Article
								date={'25.12.2021'}
								content={'Merry Cristmas!!'}
							/>
						</ErrorBoundary>
					}
				/>
				<Route
					path='/articles/:id'
					element={
						<ErrorBoundary>
							<CheckID />
						</ErrorBoundary>
					}
				/>
				<Route
					path='/profile'
					element={
						<ErrorBoundary>
							<Profile
								fullName={'Kostya Petuhkov'}
								birth={'15.05.1995'}
								email={'qwerty123@gmail.com'}
								phone={'+380994312765'}
							/>
						</ErrorBoundary>
					}
				/>
				<Route
					path='/date'
					element={<div>Enter date in format YYYY-MM-DD </div>}
				/>
				<Route
					path='date/:date'
					element={
						<ErrorBoundary>
							<CheckDate />
						</ErrorBoundary>
					}
				/>
				<Route path='*' element={<div>Page not found</div>} />
			</Routes>
		</div>
	);
}

export default App;
