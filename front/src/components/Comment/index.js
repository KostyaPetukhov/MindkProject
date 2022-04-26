import React, { useState } from 'react';
import CommentPropTypes from '../../PropTypes/CommentPropTypes';

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';

import CommentReplyHeaderContainer from '../../containers/CommentReplyHeader';
import EditComment from '../Modals/EditCommentModal';
import ReplyComment from '../Modals/ReplyCommentModal';

const Comment = (props) => {
	const {
		id,
		author,
		authorId,
		authorAvatar,
		content,
		createdAt,
		articleId,
		answerId,
	} = props;

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	if (authorId != 7) {
		return (
			<Paper elevation={4} sx={{ margin: 2 }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: 2,
					}}
				>
					<Box sx={{ display: 'flex', padding: 1 }}>
						<Box padding={0.5}>
							<Avatar
								src={authorAvatar}
								alt={author}
								sx={{ width: 35, height: 35 }}
							/>
						</Box>
						<Box marginLeft={1}>
							{answerId ? (
								<CommentReplyHeaderContainer
									commentId={answerId}
									commentAuthor={author}
								/>
							) : (
								<Typography fontSize={18} color='primary'>
									{author}
								</Typography>
							)}

							<Box sx={{ display: 'flex', flexDirection: 'row' }}>
								<Typography fontSize={14} color='#00000099'>
									{createdAt
										.slice(0, 10)
										.split('-')
										.reverse()
										.join('.')}
								</Typography>
								<Typography
									marginLeft={2}
									fontSize={14}
									color='#00000099'
								>
									{createdAt.slice(11, 16)}
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box marginTop={2}>
						<ReplyComment articleId={articleId} commentId={id} />
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<Typography marginLeft={4} marginBottom={2} fontSize={18}>
						{content}
					</Typography>
				</Box>
			</Paper>
		);
	} else {
		return (
			<Paper
				elevation={4}
				sx={{
					margin: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						padding: 2,
					}}
				>
					<Box sx={{ display: 'flex', padding: 1 }}>
						<Box padding={0.5}>
							<Avatar
								src={authorAvatar}
								alt={author}
								sx={{ width: 35, height: 35 }}
							/>
						</Box>
						<Box marginLeft={1}>
							{answerId ? (
								<CommentReplyHeaderContainer
									commentId={answerId}
									commentAuthor={author}
								/>
							) : (
								<Typography fontSize={18} color='primary'>
									{author}
								</Typography>
							)}
							<Box sx={{ display: 'flex', flexDirection: 'row' }}>
								<Typography fontSize={14} color='#00000099'>
									{createdAt
										.slice(0, 10)
										.split('-')
										.reverse()
										.join('.')}
								</Typography>
								<Typography
									marginLeft={2}
									fontSize={14}
									color='#00000099'
								>
									{createdAt.slice(11, 16)}
								</Typography>
							</Box>
						</Box>
					</Box>
					<Box>
						<IconButton aria-label='settings' onClick={handleClick}>
							<MoreVertIcon />
						</IconButton>
					</Box>
				</Box>

				<Typography marginLeft={4} paddingBottom={2} fontSize={18}>
					{content}
				</Typography>

				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
				>
					<EditComment
						id={id}
						content={content}
						closeMenu={handleClose}
					/>
				</Menu>
			</Paper>
		);
	}
};

Comment.propTypes = CommentPropTypes;

export default Comment;
