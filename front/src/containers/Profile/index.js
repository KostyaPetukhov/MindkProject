import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import UserProfile from '../../components/UserProfile';
import { getUserProfile } from '../Users/api/crud';
import authContext from '../../authContext';

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

const UserProfileContainer = () => {
	const { isAuth, user, setUserData } = useContext(authContext);
	console.log('Authorized:', isAuth, 'User:', user);
	const newUser = () => {
		setUserData({
			isAuth: true,
			user: {
				id: 2,
				name: 'Max Shevchenko',
				email: 'schvch12@gmail.com',
			},
		});
	};

	const { id } = useParams();
	const { isFetching, data } = useQuery(`users/${id}`, () =>
		getUserProfile(id)
	);

	const openModal = (profile) => () => {
		setModalContent(profile);
		setOpen(true);
	};

	const [modalContent, setModalContent] = useState('');
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	const profile = data?.data || [];

	return (
		<div>
			<Button onClick={newUser}>New user</Button>
			{isFetching && <div>Loading..</div>}
			{profile.map(({ id, username, pagename, email, phone, avatar }) => (
				<div key={id} className='userProfile'>
					<Box>
						<Avatar
							alt={username}
							src={`http://localhost:3333/${avatar}`}
							sx={{
								width: 120,
								height: 120,
							}}
						/>
					</Box>
					<Box margin={4} fontSize={24} textAlign={'center'}>
						{pagename}
					</Box>
					<Box margin={1} fontSize={20}>
						Name: {username}
					</Box>
					<Box margin={1} fontSize={20}>
						{' '}
						Email: {email}
					</Box>
					<Box margin={1} fontSize={20}>
						{' '}
						Phone number: {phone}
					</Box>
					<Button
						onClick={openModal(<UserProfile profile={profile} />)}
					>
						Edit profile
					</Button>
				</div>
			))}
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
						Edit profile
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						{modalContent}
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default UserProfileContainer;
