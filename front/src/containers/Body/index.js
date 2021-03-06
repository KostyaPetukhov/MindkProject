import React from 'react';
import PropTypes from 'prop-types';

import Article from '../../components/Article';
import Profile from '../../components/Profile';
import AddArticle from '../../components/AddArticle';

const Body = ({ activePage }) => {
	const article = 'article';
	const addArticle = 'addArticle';
	const profile = 'profile';

	return (
		<div>
			{activePage === article && (
				<Article
					fullName={'Kostya Petukhov'}
					date={'25.12.2021'}
					content={'Merry Cristmas!!'}
				/>
			)}
			{activePage === addArticle && <AddArticle />}
			{activePage === profile && (
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

Body.propTypes = {
	activePage: PropTypes.string.isRequired,
};

export default Body;
