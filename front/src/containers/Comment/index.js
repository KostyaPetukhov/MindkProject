import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { getArticleComments } from '../Articles/api/crud';
import Comment from '../../components/Comment';

const CommentsContainer = (props) => {
	const { articleId } = props;
	const { data } = useQuery(`articles/${articleId}/comments`, () =>
		getArticleComments(articleId)
	);

	const comments = data?.data || [];

	return (
		<>
			{comments.map((item) => (
				<Comment key={item.id} articleId={articleId} {...item} />
			))}
		</>
	);
};

CommentsContainer.propTypes = {
	articleId: PropTypes.number.isRequired,
};

export default CommentsContainer;
