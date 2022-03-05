import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Avatar,
	Container,
	Toolbar,
	AppBar,
	Typography,
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import AuthForm from '../../components/Auth';
import Article from '../../components/Article';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
}));

const Header = () => {
	const isAuth = true;

	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

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
									onClick={handleClickOpen}
								>
									Sign In
								</Button>
								<Dialog
									open={open}
									onClose={handleClose}
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
											onClick={handleClose}
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
							<Typography variant='h6' className={classes.title}>
								Mindk DevCamp
							</Typography>
							<Box marginRight={30}>
								<Button
									color='inherit'
									variant='outlined'
									onClick={handleClickOpen}
								>
									Add Article
								</Button>
								<Dialog
									open={open}
									onClose={handleClose}
									aria-labelledby='add-article-form'
								>
									<DialogTitle id='add-article-form'>
										Add Article
									</DialogTitle>
									<DialogContent>
										<Article />
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
							<Button color='secondary' variant='contained'>
								Ivan Abramov
							</Button>
						</Toolbar>
					</Container>
				</AppBar>
			</>
		);
	}
};

export default Header;
