import Header from './containers/Header';
import Body from './containers/Body';

import './App.css';
import { useState } from 'react';

function App() {
	const [activePage, setActivePage] = useState('profile');

	return (
		<div className='App'>
			<Header setActivePage={setActivePage} />
			<Body activePage={activePage} />
		</div>
	);
}

export default App;
