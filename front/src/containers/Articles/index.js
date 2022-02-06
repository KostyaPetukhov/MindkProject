import React from 'react';
import { useQuery } from 'react-query';

import Articles from '../../components/Articles';
import { getArticles } from './api/crud';

const ArticlesContainer = () => {
	const { isFetching, data } = useQuery('articles', () => getArticles());
	const articles = data?.data || [];

	return (
		<div>
			{isFetching && <div>Loading..</div>}
			<Articles articles={articles} />
		</div>
	);
};

export default ArticlesContainer;
