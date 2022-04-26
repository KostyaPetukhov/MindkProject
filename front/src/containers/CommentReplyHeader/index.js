import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { getComment } from '../Comment/api/crud';
import CommentReplyHeader from '../../components/CommentReplyHeader';

const CommentReplyHeaderContainer = (props) => {
	const { commentId, commentAuthor } = props;
	const { data } = useQuery(`comments/${commentId}`, () =>
		getComment(commentId)
	);

	const comment = data?.data || [];

	return (
		<>
			{comment.map(({ id, user, userid }) => (
				<CommentReplyHeader
					key={id}
					authorReply={user}
					authorReplyId={userid}
					authorComment={commentAuthor}
				/>
			))}
		</>
	);
};

CommentReplyHeaderContainer.propTypes = {
	commentId: PropTypes.number.isRequired,
	commentAuthor: PropTypes.string.isRequired,
};

export default CommentReplyHeaderContainer;
