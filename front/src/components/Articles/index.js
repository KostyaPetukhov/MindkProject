import React from 'react';
import PropTypes from 'prop-types';

import Article from '../Article';

const Articles = (props) => {
	const { articles } = props;

	return (
		<div>
			{articles.map(({ id, articletitle, articlecreatedate }) => (
				<Article
					key={id}
					content={articletitle}
					date={articlecreatedate}
				/>
			))}
		</div>
	);
};

Articles.propTypes = {
	articles: PropTypes.array,
};

export default Articles;
