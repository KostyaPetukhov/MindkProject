import PropTypes from 'prop-types';

const AdressPropTypes = {
	line1: PropTypes.number.isRequired,
	line2: PropTypes.string,
	city: PropTypes.string.isRequired,
	zip: PropTypes.string.isRequired,
};

export default AdressPropTypes;
