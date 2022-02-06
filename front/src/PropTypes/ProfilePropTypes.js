import PropTypes from 'prop-types';

const ProfilePropTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	nickname: PropTypes.string,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	avatar: PropTypes.string,
};

export default ProfilePropTypes;
