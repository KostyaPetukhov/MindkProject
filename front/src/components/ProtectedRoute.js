import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = (props) => {
	const { auth } = props;

	if (!auth) {
		return <Navigate to='/login' replace />;
	}
	return <Outlet />;
};

ProtectedRoute.propTypes = {
	auth: PropTypes.bool,
};

export default ProtectedRoute;
