import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import AddArticleForm from '../Forms/AddArticleForm';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddArticleModal = () => {
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);

	const handleCloseModal = () => setOpenModal(false);

	return (
		<div>
			<Button
				color='inherit'
				variant='outlined'
				onClick={handleOpenModal}
			>
				Add Article
			</Button>
			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby='add-article-form'
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
				<DialogTitle id='add-article-form' marginTop={1}>
					Add Article
				</DialogTitle>
				<DialogContent>
					<AddArticleForm closeModal={handleCloseModal} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AddArticleModal;
