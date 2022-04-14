import PropTypes from 'prop-types';

const ArticleHeaderPropTypes = {
	id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	authorAvatar: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	updatedAt: PropTypes.string,
	visibility: PropTypes.string,
};

export default ArticleHeaderPropTypes;
