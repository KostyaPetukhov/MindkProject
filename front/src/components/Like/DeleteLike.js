import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';

import { deleteLike } from '../../containers/Likes/api/crud';
import ArticleLikes from './ArticleLikes';

const CustomTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		boxShadow: theme.shadows[1],
		backgroundColor: '#F3F1F1',
		padding: 8,
	},
}));

const DeleteLike = (props) => {
	const { likeId, articleLikes } = props;

	const mutation = useMutation(() => deleteLike(likeId));

	const handleDeleteLike = () => {
		mutation.mutate();
	};

	const amountLikes = articleLikes.length;

	return (
		<CustomTooltip title={<ArticleLikes articleLikes={articleLikes} />}>
			<Badge
				badgeContent={amountLikes}
				overlap='circular'
				color='secondary'
			>
				<IconButton
					color='primary'
					type='submit'
					onClick={handleDeleteLike}
				>
					<Favorite />
				</IconButton>
			</Badge>
		</CustomTooltip>
	);
};

DeleteLike.propTypes = {
	likeId: PropTypes.number.isRequired,
	articleLikes: PropTypes.array,
};

export default DeleteLike;
