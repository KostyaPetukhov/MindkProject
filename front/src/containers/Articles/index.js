import React from 'react';
import { useQuery } from 'react-query';

import { getAllArticles } from './api/crud';
import ArticlesList from '../ArticlesList';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

const ArticlesContainer = () => {
	const { isFetching, isLoadingError, data } = useQuery(
		['amount-articles'],
		() => getAllArticles()
	);

	const articles = data?.data || [];
	const amount = articles.length;

	return (
		<>
			{isFetching && <Spinner />}
			{isLoadingError && <ErrorMessage />}
			<ArticlesList amountArticles={amount} articlesList={articles} />
		</>
	);
};

export default ArticlesContainer;
