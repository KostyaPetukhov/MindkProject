import Post from '../../components/Post';
import React from 'react';
import { arrayOf, string } from 'prop-types';

const PostContainer = ({ firstName, lastName, date, time, content }) => {
	const fullName = `${firstName} ${lastName}`;
	const datePublication = `${date} ${time}`;
	const textPublication = `${content}`;

	return (
		<Post
			fullName={fullName}
			date={datePublication}
			content={textPublication}
		/>
	);
};

PostContainer.propTypes = {
	firstName: arrayOf(string),
	lastName: arrayOf(string),
	date: arrayOf(string),
	time: arrayOf(string),
	content: arrayOf(string),
};

export default PostContainer;
