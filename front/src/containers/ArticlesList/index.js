import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArticleHeader from '../../components/Article/ArticleHeader';
import ArticleFooter from '../../components/Article/ArticleFooter';
import { getArticles } from '../Articles/api/crud';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	page: {
		marginTop: 80,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	article: {
		display: 'flex',
		flexDirection: 'column',
		width: 600,
		border: '2px solid grey',
		margin: 15,
		padding: 20,
		borderColor: '#ede7f6',
	},
	loadButton: {
		width: 600,
		margin: 25,
	},
}));

const ArticlesList = (props) => {
	const { amountArticles } = props;

	const [pageNumber, setPageNumber] = useState(1);
	const articlesPerPage = 10;

	const { isSuccess, data } = useQuery(
		['articles', articlesPerPage, pageNumber],
		() => getArticles(articlesPerPage, pageNumber),
		{
			refetchInterval: 2000,
		}
	);

	const articlesList = data?.data || [];
	const classes = useStyles();

	return (
		<Box className={classes.page}>
			{isSuccess && (
				<>
					{articlesList.map(
						({
							id,
							user,
							articletitle,
							articlecreatedat,
							articleupdatedat,
							avatar,
							visibility,
						}) => (
							<Card key={id} className={classes.article}>
								<ArticleHeader
									id={id}
									content={articletitle}
									author={user}
									authorAvatar={avatar}
									createdAt={articlecreatedat}
									updatedAt={articleupdatedat}
									visibility={visibility}
								/>
								<CardContent>
									<Typography paragraph fontSize={18}>
										{articletitle}
									</Typography>
								</CardContent>
								<ArticleFooter id={id} />
							</Card>
						)
					)}
					<Button
						className={classes.loadButton}
						color='secondary'
						onClick={() => setPageNumber((page) => page + 1)}
						disabled={
							pageNumber * articlesPerPage >= amountArticles
						}
					>
						Load more
					</Button>
				</>
			)}
		</Box>
	);
};

ArticlesList.propTypes = {
	amountArticles: PropTypes.number,
};

export default ArticlesList;
