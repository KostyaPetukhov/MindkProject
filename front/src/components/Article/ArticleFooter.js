import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';

import { getArticleComments } from '../../containers/Articles/api/crud';
import CommentsContainer from '../../containers/Comment';
import LikesContainer from '../../containers/Likes';
import AddCommentModal from '../Modals/AddCommentModal';

const useStyles = makeStyles(() => ({
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '8px',
	},
	comments: {
		display: 'flex',
		alignItems: 'center',
		minWidth: 150,
	},
	like: {
		minWidth: 100,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	expandContainer: {
		width: 25,
		height: 25,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 100,
		cursor: 'pointer',
		'&:hover': {
			background: '#DADADA',
		},
	},
	expandButton: {
		transitionDuration: '3s',
		transitionProperty: 'transform',
		color: '#7E7E7E',
		transform: ({ expanded }) =>
			expanded ? 'rotate(180deg)' : 'rotate(0deg)',
	},
}));

const ArticleFooter = (props) => {
	const { id } = props;
	const [expanded, setExpanded] = useState(false);
	const classes = useStyles({ expanded });

	const { data } = useQuery(`articles/${id}/comments`, () =>
		getArticleComments(id)
	);

	const comments = data?.data || [];
	const amount = comments.length;

	const handleExpandClick = () => setExpanded(!expanded);

	return (
		<>
			<Box className={classes.footer}>
				<Box className={classes.comments}>
					<Typography padding={1}>Comments - {amount}</Typography>
					{amount !== 0 && (
						<Box
							onClick={handleExpandClick}
							className={classes.expandContainer}
						>
							<ExpandMoreIcon className={classes.expandButton} />
						</Box>
					)}
				</Box>
				<Box>
					<AddCommentModal articleId={id} />
				</Box>

				<Box className={classes.like}>
					<LikesContainer articleId={id} />
				</Box>
			</Box>
			{amount !== 0 && (
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<CommentsContainer articleId={id} />
					</CardContent>
				</Collapse>
			)}
		</>
	);
};

ArticleFooter.propTypes = {
	id: PropTypes.number.isRequired,
};

export default ArticleFooter;
