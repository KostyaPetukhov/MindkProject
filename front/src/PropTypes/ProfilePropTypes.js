import PropTypes from 'prop-types';

const ProfilePropTypes = {
	fullName: PropTypes.string.isRequired,
	birth: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
};

export default ProfilePropTypes;
