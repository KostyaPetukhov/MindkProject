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
			{comments.map(
				({
					id,
					user,
					userId,
					avatar,
					commenttitle,
					commentcreatedat,
					commentanswerid,
				}) => (
					<Comment
						key={id}
						id={id}
						content={commenttitle}
						createdAt={commentcreatedat}
						author={user}
						authorId={userId}
						authorAvatar={avatar}
						articleId={articleId}
						answerId={commentanswerid}
					/>
				)
			)}
		</>
	);
};

CommentsContainer.propTypes = {
	articleId: PropTypes.number.isRequired,
};

export default CommentsContainer;
