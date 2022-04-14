import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ArticleFooter = (props) => {
	const { id } = props;
	return (
		<>
			<CardActions disableSpacing>
				<IconButton aria-label='add to favorites'>
					<FavoriteIcon />
				</IconButton>
				<Typography>Likes - {id}</Typography>
				<ExpandMoreIcon />
			</CardActions>
		</>
	);
};

ArticleFooter.propTypes = {
	id: PropTypes.number.isRequired,
};

export default ArticleFooter;
