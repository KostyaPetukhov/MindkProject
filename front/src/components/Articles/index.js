import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Article from '../Article';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const Articles = (props) => {
	const { articles } = props;

	const openModal = (article) => () => {
		setModalContent(article);
		setOpen(true);
	};

	const [modalContent, setModalContent] = useState('');
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	return (
		<>
			{articles.map(
				({ id, userid, articletitle, articlecreatedat, image }) => (
					<div key={id} className='articleInSocialNetwork'>
						<div className='name'>{userid}</div>
						<div className='date'>{articlecreatedat}</div>
						<div className='content'>{articletitle}</div>
						<Button
							onClick={openModal(
								<Article
									id={id}
									content={articletitle}
									image={image}
								/>
							)}
						>
							Edit article
						</Button>
					</div>
				)
			)}

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'
					>
						Edit article
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						{modalContent}
					</Typography>
				</Box>
			</Modal>
		</>
	);
};

Articles.propTypes = {
	articles: PropTypes.array,
};

export default Articles;
