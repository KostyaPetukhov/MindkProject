import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import UserProfileForm from '../Forms/UserProfileForm';
import UserAvatarForm from '../Forms/UserAvatarForm';

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	page: {
		marginTop: 80,
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
	profile: {
		display: 'flex',
		flexDirection: 'row',
		width: '600px',
		margin: '30px auto',
		color: 'rgba(0, 0, 0, 0.87)',
	},
	userInfo: {
		width: '80%',
	},
	userAvatar: {
		width: '20%',
		paddingTop: '30px',
	},
}));

const Profile = (props) => {
	const { userProfile } = props;
	const classes = useStyles();
	return (
		<Box className={classes.page}>
			{userProfile.map((item) => (
				<Box key={item.id} className={classes.profile}>
					<Box className={classes.userInfo}>
						<Typography paragraph fontSize={28} color='#000000de'>
							Profile
						</Typography>
						<Box>
							<UserProfileForm {...item} />
						</Box>
					</Box>
					<Box className={classes.userAvatar}>
						<UserAvatarForm {...item} />
					</Box>
				</Box>
			))}
		</Box>
	);
};

Profile.propTypes = {
	userProfile: PropTypes.array,
};

export default Profile;
