import PropTypes from 'prop-types';

const ArticleHeaderPropTypes = {
	id: PropTypes.number.isRequired,
	articletitle: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired,
	authorId: PropTypes.number.isRequired,
	avatar: PropTypes.string.isRequired,
	articlecreatedat: PropTypes.string.isRequired,
	articleupdatedat: PropTypes.string,
	visibility: PropTypes.string,
};

export default ArticleHeaderPropTypes;
