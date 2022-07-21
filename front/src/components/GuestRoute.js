import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = (props) => {
	const { auth } = props;

	if (auth) {
		return <Navigate to='/' replace />;
	}
	return <Outlet />;
};

GuestRoute.propTypes = {
	auth: PropTypes.bool,
};

export default GuestRoute;
