import React from 'react';

import Article from '../../components/Article';
import Profile from '../../components/Profile';
import AddArticle from '../../components/AddArticle';

const Body = ({ activePage }) => {
	return (
		<div>
			{activePage === 'article' && (
				<Article
					fullName={'Kostya Petukhov'}
					date={'25.12.2021'}
					content={'Merry Cristmas!!'}
				/>
			)}
			{activePage === 'addArticle' && <AddArticle />}
			{activePage === 'profile' && (
				<Profile
					fullName={'Kostya Petuhkov'}
					birth={'15.05.1995'}
					email={'qwerty123@gmail.com'}
					phone={'+380994312765'}
				/>
			)}
		</div>
	);
};

export default Body;
