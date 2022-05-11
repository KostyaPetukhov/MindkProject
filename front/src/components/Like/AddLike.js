import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

import { addLike } from '../../containers/Likes/api/crud';
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

const AddLike = (props) => {
	const { userId, articleId, articleLikes } = props;

	const mutation = useMutation((data) => addLike(data));

	const onFormSubmit = () => {
		mutation.mutate({
			articleid: articleId,
			userid: userId,
		});
	};

	const navigate = useNavigate();
	const goToArticlesPage = () => {
		navigate('/articles');
	};

	const amountLikes = articleLikes.length;

	return (
		<Formik initialValues={{}} onSubmit={onFormSubmit}>
			<Form>
				<CustomTooltip
					title={<ArticleLikes articleLikes={articleLikes} />}
				>
					<Badge
						badgeContent={amountLikes}
						overlap='circular'
						color='secondary'
					>
						<IconButton type='submit' onClick={goToArticlesPage}>
							<FavoriteBorder />
						</IconButton>
					</Badge>
				</CustomTooltip>
			</Form>
		</Formik>
	);
};

AddLike.propTypes = {
	userId: PropTypes.number.isRequired,
	articleId: PropTypes.number.isRequired,
	articleLikes: PropTypes.array,
};

export default AddLike;
