import React from 'react';

import Body from './containers/Body';
import UserPropTypes from '../../PropTypes/UserPropTypes';

const User = () => {
	return (
		<div>
			<Body
				user={{
					name: 'test',
					age: '23',
					avatar: {
						file: {
							id: 1,
							name: '123.jpg',
							path: '/files/1.jpg',
						},
					},
					files: [
						{
							id: 1,
							name: '123.jpg',
							path: '/files/1.jpg',
						},
						{
							id: 1,
							name: '123.jpg',
							path: '/files/1.jpg',
						},
					],
					addrr: {
						main: {
							line1: 'test',
							line2: 'test',
							city: 'test',
							zip: 1234,
						},
						alt: {
							line1: 'test',
							line2: 'test',
							city: 'test',
							zip: 1234,
						},
					},
					friends: [
						{
							name: 'test',
							age: '23',
							avatar: {
								file: {
									id: 1,
									name: '123.jpg',
									path: '/files/1.jpg',
								},
							},
							files: [
								{
									id: 1,
									name: '123.jpg',
									path: '/files/1.jpg',
								},
								{
									id: 1,
									name: '123.jpg',
									path: '/files/1.jpg',
								},
							],
							addrr: {
								main: {
									line1: 'test',
									line2: 'test',
									city: 'test',
									zip: 1234,
								},
								alt: {
									line1: 'test',
									line2: 'test',
									city: 'test',
									zip: 1234,
								},
							},
						},
					],
				}}
			/>
		</div>
	);
};

User.propTypes = UserPropTypes;

export default User;
