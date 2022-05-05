import PropTypes from 'prop-types';

const CommentPropTypes = {
	id: PropTypes.number.isRequired,
	commenttitle: PropTypes.string.isRequired,
	commentcreatedat: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired,
	userId: PropTypes.number.isRequired,
	avatar: PropTypes.string,
	articleId: PropTypes.number.isRequired,
	commentanswerid: PropTypes.number,
};

export default CommentPropTypes;
