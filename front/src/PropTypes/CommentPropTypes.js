import PropTypes from 'prop-types';

const CommentPropTypes = {
	id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	authorId: PropTypes.number.isRequired,
	authorAvatar: PropTypes.string,
	articleId: PropTypes.number.isRequired,
	answerId: PropTypes.number,
};

export default CommentPropTypes;
