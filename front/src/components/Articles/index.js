import React from 'react';
import PropTypes from 'prop-types';

import Article from '../Article';

const Articles = (props) => {
	const { articles } = props;

	return (
		<div>
			{articles.map(({ id, userid, articletitle, articlecreatedat }) => (
				<Article
					key={id}
					id={id}
					fullName={userid}
					content={articletitle}
					date={articlecreatedat}
				/>
			))}
		</div>
	);
};

Articles.propTypes = {
	articles: PropTypes.array,
};

export default Articles;
