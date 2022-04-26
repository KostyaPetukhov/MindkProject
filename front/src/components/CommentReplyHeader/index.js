import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const CommentReplyHeader = (props) => {
	const { authorReply, authorReplyId, authorComment } = props;
	return (
		<>
			<Typography fontSize={18} color='primary'>
				{authorComment} to
				<Link
					href={`/users/${authorReplyId}`}
					underline='always'
					color='#01579b'
					marginLeft={0.5}
				>
					{authorReply}
				</Link>
			</Typography>
		</>
	);
};

CommentReplyHeader.propTypes = {
	authorReply: PropTypes.string.isRequired,
	authorReplyId: PropTypes.number.isRequired,
	authorComment: PropTypes.string.isRequired,
};

export default CommentReplyHeader;
