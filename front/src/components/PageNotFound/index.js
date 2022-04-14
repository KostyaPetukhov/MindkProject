import React from 'react';
import img from './error404.png';

const PageNotFound = () => {
	return (
		<div style={{ margin: '50px auto' }}>
			<img
				src={img}
				style={{
					// width: '500px',
					// height: '500px',
					margin: '0 auto',
				}}
			/>
		</div>
	);
};

export default PageNotFound;
