import PropTypes from 'prop-types';

const ArticlePropTypes = {
	id: PropTypes.number.isRequired,
	fullName: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};

export default ArticlePropTypes;
