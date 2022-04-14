import React from 'react';
import img from './error.gif';

const ErrorMessage = () => {
	return (
		<div style={{ margin: '100px auto' }}>
			<img
				src={img}
				style={{
					width: '500px',
					height: '500px',
					margin: '0 auto',
				}}
			/>
		</div>
	);
};

export default ErrorMessage;
