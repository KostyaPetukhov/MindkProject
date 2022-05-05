import PropTypes from 'prop-types';

const UserProfileForm = {
	id: PropTypes.number.isRequired,
	username: PropTypes.string.isRequired,
	pagename: PropTypes.string,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	university: PropTypes.string,
	universities: PropTypes.array,
};

export default UserProfileForm;
