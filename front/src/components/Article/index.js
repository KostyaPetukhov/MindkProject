import React from 'react';

import './style.css';

const Article = () => {
	const article = {
		fullName: 'Andrey Vorobey',
		date: '25.12.2021',
		content: 'Merry Christmas!!',
	};
	return (
		<div className='articleInSocialNetwork'>
			<p className='name'>{article.fullName}</p>
			<p className='date'>{article.date}</p>
			<p className='content'>{article.content}</p>
		</div>
	);
};

export default Article;
