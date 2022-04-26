import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from '@material-ui/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { deleteComment } from '../../containers/Comment/api/crud';
import EditCommentForm from '../Forms/EditCommentForm';

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

const EditComment = (props) => {
	const { id, content, closeMenu } = props;
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const mutation = useMutation(() => deleteComment(id));

	const handleDeleteComment = () => {
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
				onClick={handleDeleteComment}
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
				aria-labelledby='edit-comment-form'
			>
				<Box className={classes.closeIcon}>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<DialogTitle id='edit-comment-form' marginTop={1}>
					Edit Comment
				</DialogTitle>
				<DialogContent>
					<EditCommentForm
						id={id}
						content={content}
						closeModal={handleClose}
						closeMenu={closeMenu}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

EditComment.propTypes = {
	id: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	closeMenu: PropTypes.func,
};

export default EditComment;
