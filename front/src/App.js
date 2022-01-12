import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './containers/Header';
import Article from './components/Article';
import Profile from './components/Profile';
import AddArticle from './components/AddArticle';
import CheckDate from './containers/CheckDate';
import CheckID from './containers/CheckID';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route path='/' element={<div>Home Page</div>} />
				<Route path='/article' element={<AddArticle />} />
				<Route path='/articles' element={<Article />} />
				<Route path='/articles/:id' element={<CheckID />} />
				<Route path='/profile' element={<Profile />} />
				<Route
					path='/date'
					element={<div>Enter date in format YYYY-MM-DD </div>}
				/>
				<Route path='date/:date' element={<CheckDate />} />
				<Route path='*' element={<div>Page not found</div>} />
			</Routes>
		</div>
	);
}

export default App;
