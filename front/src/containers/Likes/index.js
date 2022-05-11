import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { getArticleLikes } from '../Articles/api/crud';

import UserLikes from '../UserLikes';
import AddLike from '../../components/Like/AddLike';

const LikesContainer = (props) => {
	const { articleId } = props;
	const userId = 7; // позже подключить к авторизации

	const { data } = useQuery(
		`articles/${articleId}/likes`,
		() => getArticleLikes(articleId),
		{
			refetchInterval: 2000,
		}
	);

	const likes = data?.data || [];
	const amountLikes = likes.length;

	return (
		<>
			{amountLikes ? (
				<UserLikes
					articleId={articleId}
					userId={userId}
					articleLikes={likes}
				/>
			) : (
				<AddLike
					userId={userId}
					articleId={articleId}
					articleLikes={likes}
				/>
			)}
		</>
	);
};

LikesContainer.propTypes = {
	articleId: PropTypes.number.isRequired,
};

export default LikesContainer;
