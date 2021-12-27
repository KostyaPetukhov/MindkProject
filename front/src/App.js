import PostContainer from './containers/Post';
import React from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<PostContainer
					firstName='Ivan'
					lastName='Petrov'
					date='12.02.2021'
					time='17:43'
					content='Nice weather today! Its really good day!'
				/>
			</header>
		</div>
	);
}

export default App;
