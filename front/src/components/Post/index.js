import './style.css';

const Post = ({ fullName, date, content }) => {
    return (
        <div className='postInSocialNetwork'>
            <p className='name'>{fullName}</p>
            <p className='date'>{date}</p>
            <p className='content'>{content}</p>
        </div>
    );
};

export default Post;
