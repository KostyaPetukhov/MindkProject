import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Link from '@mui/material/Link';

const ArticleLikes = (props) => {
	const { articleLikes } = props;

	return (
		<AvatarGroup max={4} sx={{ marginLeft: 1 }}>
			{articleLikes.map((item) => (
				<Link
					key={item.userid}
					marginLeft={-1}
					href={`/users/${item.userid}`}
				>
					<Avatar
						key={item.userid}
						alt={item.user}
						src={item.avatar}
					/>
				</Link>
			))}
		</AvatarGroup>
	);
};

ArticleLikes.propTypes = {
	articleLikes: PropTypes.array,
};

export default ArticleLikes;
