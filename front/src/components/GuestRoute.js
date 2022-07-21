import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = (props) => {
	const { auth, children } = props;

	if (auth) {
		return <Navigate to='/' replace />;
	}
	return children;
};

GuestRoute.propTypes = {
	children: PropTypes.node,
	auth: PropTypes.bool,
};

export default GuestRoute;
