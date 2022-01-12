import React from 'react';
import { useParams } from 'react-router-dom';

const CheckID = () => {
	const { id } = useParams();

	const isNumber = /^\d+$/;
	const isUpperCase = /^[A-Z]+$/;
	const isFile = /([\w\d]+\.(doc|pdf|jpeg)$)/;

	const checkNumber = isNumber.test(id);
	const checkUpperCase = isUpperCase.test(id);
	const checkFile = isFile.test(id);

	const correctRoute = checkNumber || checkUpperCase || checkFile;

	if (correctRoute) {
		return <div> Welcome! </div>;
	}
	return <div> You enter incorrect route</div>;
};

export default CheckID;
