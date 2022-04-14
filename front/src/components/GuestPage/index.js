import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AuthForm from '../Forms/AuthForm';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	content: {
		marginTop: 200,
		textAlign: 'center',
		flexGrow: 1,
	},
}));

const GuestPage = () => {
	const classes = useStyles();
	return (
		<>
			<Grid
				className={classes.content}
				container
				flexDirection='column'
				alignContent='center'
			>
				<Grid item>
					<Box>
						<Typography
							color='textPrimary'
							fontSize={30}
							align='center'
							marginBottom={8}
							className={classes.paragraph}
						>
							Please authorize to continue
						</Typography>
					</Box>
					<AuthForm />
				</Grid>
			</Grid>
		</>
	);
};

export default GuestPage;
