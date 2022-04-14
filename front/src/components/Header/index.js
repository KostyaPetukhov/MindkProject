import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

import { makeStyles } from '@material-ui/styles';
import AuthForm from '../Forms/AuthForm';
import AddArticleForm from '../Forms/AddArticleForm';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	addArticle: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'center',
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

const Header = () => {
	const isAuth = true;

	const classes = useStyles();

	const [popoverElement, setPopoverElement] = useState(null);

	const handleClosePopover = () => setPopoverElement(null);

	const handleOpenPopover = (event) => {
		setPopoverElement(event.currentTarget);
	};

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);

	const handleCloseModal = () => setOpenModal(false);

	if (isAuth === false) {
		return (
			<>
				<AppBar position='fixed'>
					<Container>
						<Toolbar>
							<Typography variant='h6' className={classes.title}>
								Mindk DevCamp
							</Typography>
							<Box marginRight={2}>
								<Button
									color='inherit'
									variant='outlined'
									onClick={handleOpenModal}
								>
									Sign In
								</Button>
								<Dialog
									open={openModal}
									onClose={handleCloseModal}
									aria-labelledby='auth-form'
								>
									<DialogTitle id='auth-form'>
										Sign In
									</DialogTitle>
									<DialogContent>
										<DialogContentText marginBottom={3}>
											Please, sign up in Google or
											Facebook
										</DialogContentText>
										<AuthForm />
									</DialogContent>
									<DialogActions>
										<Button
											onClick={handleCloseModal}
											color='primary'
										>
											Cancel
										</Button>
									</DialogActions>
								</Dialog>
							</Box>
							<Box marginRight={2}>
								<Link to='/users'>
									<Button color='inherit' variant='outlined'>
										Log In
									</Button>
								</Link>
							</Box>
							<Link to='/articles'>
								<Button color='secondary' variant='contained'>
									Log Out
								</Button>
							</Link>
						</Toolbar>
					</Container>
				</AppBar>
			</>
		);
	} else {
		return (
			<>
				<AppBar position='fixed'>
					<Container>
						<Toolbar>
							<Typography variant='h6'>Mindk DevCamp</Typography>
							<Box className={classes.addArticle}>
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
									<Box className={classes.closeIcon}>
										<IconButton onClick={handleCloseModal}>
											<CloseIcon />
										</IconButton>
									</Box>
									<DialogTitle
										id='add-article-form'
										marginTop={1}
									>
										Add Article
									</DialogTitle>
									<DialogContent>
										<AddArticleForm
											closeModal={handleCloseModal}
										/>
									</DialogContent>
								</Dialog>
							</Box>
							<Box marginRight={1}>
								<Avatar
									alt={name}
									src={`http://localhost:3333/uploads/1644753990513-Koala.jpg`}
									sx={{ width: 50, height: 50 }}
								/>
							</Box>
							<Button
								color='secondary'
								variant='contained'
								aria-labelledby='right-menu'
								onClick={handleOpenPopover}
							>
								Ivan Abramov
							</Button>

							<Menu
								id='right-menu'
								anchorEl={popoverElement}
								open={Boolean(popoverElement)}
								onClose={handleClosePopover}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center',
								}}
							>
								<Link to='/users/2'>
									<MenuItem
										style={{ color: '#1976d2' }}
										onClick={handleClosePopover}
									>
										<PersonIcon className={classes.icons} />
										Profile
									</MenuItem>
								</Link>
								<Link to='/'>
									<MenuItem
										style={{ color: '#9c27b0' }}
										onClick={handleClosePopover}
									>
										<LogoutIcon className={classes.icons} />
										Logout
									</MenuItem>
								</Link>
							</Menu>
						</Toolbar>
					</Container>
				</AppBar>
			</>
		);
	}
};

export default Header;
