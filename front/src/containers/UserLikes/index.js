import React from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import { getUserLikes } from '../Users/api/crud';
import AddLike from '../../components/Like/AddLike';
import DeleteLike from '../../components/Like/DeleteLike';

const UserLikes = (props) => {
	const { articleId, userId, articleLikes } = props;

	const { data } = useQuery(
		`users/${userId}/likes`,
		() => getUserLikes(userId),
		{
			refetchInterval: 2000,
		}
	);
	const userLikes = data?.data || [];

	const articlesLiked = userLikes.map(({ articleid }) => articleid);
	const myLike = articlesLiked.includes(articleId);

	return (
		<>
			{myLike === true ? (
				userLikes.map(
					({ id, articleid }) =>
						articleid === articleId && (
							<DeleteLike
								key={articleid}
								likeId={id}
								articleLikes={articleLikes}
							/>
						)
				)
			) : (
				<AddLike
					userId={userId}
					articleId={articleId}
					articleLikes={articleLikes}
				/>
			)}
		</>
	);
};

UserLikes.propTypes = {
	articleId: PropTypes.number.isRequired,
	userId: PropTypes.number.isRequired,
	articleLikes: PropTypes.array,
};

export default UserLikes;
