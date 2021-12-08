import Post from '../../components/Post';

const PostContainer = ({ firstName, lastName, date, time, content }) => {
    const fullName = `${firstName} ${lastName}`;
    const datePublication = `${date} ${time}`;
    const textPublication = `${content}`;

    return (
        <Post
            fullName={fullName}
            date={datePublication}
            content={textPublication}
        />
    );
};

export default PostContainer;
