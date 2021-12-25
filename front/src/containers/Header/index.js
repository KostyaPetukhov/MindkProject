import React from 'react';
import './style.css';

const Header = ({ setActivePage }) => {
	return (
		<div className='header'>
			<button onClick={() => setActivePage('article')}>Articles</button>
			<button onClick={() => setActivePage('addArticle')}>
				Add Article
			</button>
			<button onClick={() => setActivePage('profile')}>Profile</button>
		</div>
	);
};

export default Header;
