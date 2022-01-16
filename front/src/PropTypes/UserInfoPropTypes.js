import PropTypes from 'prop-types';
import AdressPropTypes from './AdressPropTypes';
import FilePropTypes from './FilePropTypes';

const UserInfoPropTypes = {
	name: PropTypes.string.isRequired,
	age: PropTypes.string,
	avatar: PropTypes.shape({
		file: PropTypes.shape({
			FilePropTypes,
		}).isRequired,
	}),
	files: PropTypes.arrayOf(
		PropTypes.shape({
			FilePropTypes,
		}).isRequired
	),
	adrr: PropTypes.shape({
		main: PropTypes.shape(AdressPropTypes).isRequired,
		alt: PropTypes.shape(AdressPropTypes),
	}),
};

export default UserInfoPropTypes;
