import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import AddCommentForm from '../Forms/AddCommentForm';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddCommentModal = (props) => {
	const { articleId } = props;

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);

	const handleCloseModal = () => setOpenModal(false);

	return (
		<div>
			<Button variant='outlined' onClick={handleOpenModal}>
				Add Comment
			</Button>
			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby='add-comment-form'
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
				<DialogTitle id='add-comment-form' marginTop={1}>
					Add Comment
				</DialogTitle>
				<DialogContent>
					<AddCommentForm
						articleId={articleId}
						closeModal={handleCloseModal}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

AddCommentModal.propTypes = {
	articleId: PropTypes.number.isRequired,
};

export default AddCommentModal;
