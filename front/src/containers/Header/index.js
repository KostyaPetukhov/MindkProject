import React from 'react';

import './style.css';

const Header = ({ setActivePage }) => {
	const articles = () => {
		setActivePage('article');
	};

	const addArticle = () => {
		setActivePage('addArticle');
	};

	const profile = () => {
		setActivePage('profile');
	};

	return (
		<div className='header'>
			<button onClick={articles}>Articles</button>
			<button onClick={addArticle}>Add Article</button>
			<button onClick={profile}>Profile</button>
		</div>
	);
};

export default Header;
