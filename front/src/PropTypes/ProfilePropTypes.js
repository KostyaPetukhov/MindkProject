import PropTypes from 'prop-types';

const ProfilePropTypes = {
	name: PropTypes.string,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
};

export default ProfilePropTypes;
