import PropTypes from 'prop-types';

const EditArticleFormProps = {
	id: PropTypes.number.isRequired,
	content: PropTypes.string,
	closeModal: PropTypes.func,
	closeMenu: PropTypes.func,
};

export default EditArticleFormProps;
