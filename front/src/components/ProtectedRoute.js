import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = (props) => {
	const { auth, children } = props;

	if (!auth) {
		return <Navigate to='/login' replace />;
	}
	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node,
	auth: PropTypes.bool,
};

export default ProtectedRoute;
