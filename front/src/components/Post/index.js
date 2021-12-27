import './style.css';
import React from 'react';
import { arrayOf, string } from 'prop-types';

const Post = ({ fullName, date, content }) => {
	return (
		<div className='postInSocialNetwork'>
			<p className='name'>{fullName}</p>
			<p className='date'>{date}</p>
			<p className='content'>{content}</p>
		</div>
	);
};

Post.propTypes = {
	fullName: arrayOf(string),
	date: arrayOf(string),
	content: arrayOf(string),
};

export default Post;
