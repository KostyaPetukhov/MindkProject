import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const Header = () => {
	return (
		<div className='header'>
			<Link to='/articles'>
				<button>Articles</button>
			</Link>
			<Link to='/article'>
				<button>Add Article</button>
			</Link>
			<Link to='/users'>
				<button>Users list</button>
			</Link>
		</div>
	);
};

export default Header;
