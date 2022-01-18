import PropTypes from 'prop-types';

const ArticlePropTypes = {
	fullName: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};

export default ArticlePropTypes;
