import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { deleteArticle } from '../../containers/Articles/api/crud';
import {
	Button,
	MenuItem,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import EditArticleForm from '../Forms/EditArticleForm';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	icons: {
		fontSize: 'small',
		marginRight: 5,
	},
	closeIcon: {
		position: 'absolute',
		left: '91%',
		top: '2%',
		color: 'inherit',
	},
}));

const EditArticle = (props) => {
	const { id, content, visibility, closeMenu } = props;
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const mutation = useMutation(() => deleteArticle(id));

	const handleDeleteArticle = () => {
		mutation.mutate();
		closeMenu();
	};

	return (
		<div>
			<MenuItem
				component={Button}
				onClick={handleOpen}
				sx={{
					width: '100%',
					textTransform: 'capitalize',
				}}
			>
				<EditOutlinedIcon className={classes.icons} />
				Edit
			</MenuItem>
			<MenuItem
				component={Button}
				onClick={handleDeleteArticle}
				sx={{
					width: '100%',
					textTransform: 'capitalize',
				}}
			>
				<DeleteIcon className={classes.icons} />
				Delete
			</MenuItem>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='edit-article-form'
			>
				<Box className={classes.closeIcon}>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<DialogTitle id='edit-article-form' marginTop={1}>
					Edit Article
				</DialogTitle>
				<DialogContent>
					<EditArticleForm
						id={id}
						content={content}
						visibility={visibility}
						closeModal={handleClose}
						closeMenu={closeMenu}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

EditArticle.propTypes = {
	id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	visibility: PropTypes.string,
	closeMenu: PropTypes.func,
};

export default EditArticle;
