import React from 'react';
import { useParams } from 'react-router-dom';

import './style.css';
import ProfilePropTypes from '../../PropTypes/ProfilePropTypes';

const Profile = (props) => {
	const { name, email, phone } = props;
	const { id } = useParams();

	return (
		<div>
			<div className='userProfile'>
				<p className='userName'>{name}</p>
				<p className='field'> Email: {email}</p>
				<p className='field'> Phone number: {phone}</p>
				Avatar upload:
				<form
					action={`http://localhost:3333/users/${id}/avatar`}
					method='POST'
					encType='multipart/form-data'
				>
					<input type='file' name='avatar' />
					<button type='submit'>SEND</button>
				</form>
			</div>
		</div>
	);
};

Profile.propTypes = ProfilePropTypes;

export default Profile;
