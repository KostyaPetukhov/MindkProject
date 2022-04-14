import PropTypes from 'prop-types';

const UserProfileForm = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	nickname: PropTypes.string,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	university: PropTypes.string,
	universities: PropTypes.array,
};

export default UserProfileForm;
