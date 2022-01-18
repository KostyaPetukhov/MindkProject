import PropTypes from 'prop-types';
import UserInfoPropTypes from './UserInfoPropTypes';

const UserPropTypes = {
	UserInfoPropTypes,
	friends: PropTypes.arrayOf(PropTypes.shape(UserInfoPropTypes)),
};

export default UserPropTypes;
