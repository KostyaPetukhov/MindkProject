import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import ReplyCommentForm from '../Forms/ReplyCommentForm';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ReplyComment = (props) => {
	const { articleId, commentId } = props;

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);

	const handleCloseModal = () => setOpenModal(false);

	return (
		<>
			<Button variant='contained' size='small' onClick={handleOpenModal}>
				Reply
			</Button>
			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby='reply-comment-form'
			>
				<Box
					sx={{
						position: 'absolute',
						left: '91%',
						top: '2%',
						color: 'inherit',
					}}
				>
					<IconButton onClick={handleCloseModal}>
						<CloseIcon />
					</IconButton>
				</Box>
				<DialogTitle id='reply-comment-form' marginTop={1}>
					Reply to Comment
				</DialogTitle>
				<DialogContent>
					<ReplyCommentForm
						articleId={articleId}
						commentAnswerId={commentId}
						closeModal={handleCloseModal}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};

ReplyComment.propTypes = {
	articleId: PropTypes.number.isRequired,
	commentId: PropTypes.number.isRequired,
};

export default ReplyComment;
