import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Typography from '@mui/material/Typography';
// import { makeStyles } from '@material-ui/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
// import AddArticleForm from '../Forms/AddArticleForm';
import { getArticleComments } from '../../containers/Articles/api/crud';
import CommentsContainer from '../../containers/Comment';
import AddCommentModal from '../Modals/AddCommentModal';

// const useStyles = makeStyles(() => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	title: {
// 		flexGrow: 1,
// 	},
// 	addArticle: {
// 		flexGrow: 1,
// 		display: 'flex',
// 		justifyContent: 'center',
// 	},
// 	icons: {
// 		fontSize: 'small',
// 		marginRight: 5,
// 	},
// 	closeIcon: {
// 		position: 'absolute',
// 		left: '91%',
// 		top: '2%',
// 		color: 'inherit',
// 	},
// 	commentsLink: {
// 		width: '150px',
// 	},
// }));

const ExpandMore = styled((props) => {
	// eslint-disable-next-line no-unused-vars
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	padding: '0px',
	marginLeft: '-190px',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

const ArticleFooter = (props) => {
	const { id } = props;

	const { data } = useQuery(
		`articles/${id}/comments`,
		() => getArticleComments(id),
		{
			refetchInterval: 5000,
		}
	);

	const comments = data?.data || [];
	const amount = comments.length;
	// const classes = useStyles();

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	if (amount === 0) {
		return (
			<>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '8px',
					}}
				>
					<Typography padding={1}>Comments - {amount}</Typography>
					<Box sx={{ marginLeft: '-85px' }}>
						<AddCommentModal articleId={id} />
					</Box>
					<IconButton aria-label='add to favorites'>
						<FavoriteIcon />
					</IconButton>
				</Box>
			</>
		);
	} else {
		return (
			<>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: '8px',
					}}
				>
					<Typography padding={1}>Comments - {amount}</Typography>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
					>
						<ExpandMoreIcon />
					</ExpandMore>

					<Box sx={{ marginLeft: '-105px' }}>
						<AddCommentModal articleId={id} />
					</Box>

					<IconButton aria-label='add to favorites'>
						<FavoriteIcon />
					</IconButton>
				</Box>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent>
						<CommentsContainer articleId={id} />
					</CardContent>
				</Collapse>
			</>
		);
	}
};

ArticleFooter.propTypes = {
	id: PropTypes.number.isRequired,
};

export default ArticleFooter;
