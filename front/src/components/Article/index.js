import React from 'react';
import ArticlePropTypes from '../../PropTypes/ArticlePropTypes';

import './style.css';

const Article = (props) => {
	const { fullName, date, content } = props;
	return (
		<div className='articleInSocialNetwork'>
			<p className='name'>{fullName}</p>
			<p className='date'>{date}</p>
			<p className='content'>{content}</p>
		</div>
	);
};

Article.propTypes = ArticlePropTypes;

Article.defaultProps = {
	fullName: 'Ivan Ivanov',
};

export default Article;
