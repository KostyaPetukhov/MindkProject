import './style.css';

const Article = ({ fullName, date, content }) => {
	return (
		<div className='articleInSocialNetwork'>
			<p className='name'>{fullName}</p>
			<p className='date'>{date}</p>
			<p className='content'>{content}</p>
		</div>
	);
};

export default Article;
