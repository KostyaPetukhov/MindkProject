import './style.css';

const AddArticle = () => {
	return (
		<div className='addArticle'>
			<p>Add article</p>
			<textarea>Write new article...</textarea>
			<div className='buttonBlock'>
				<button>Cancel</button>
				<button>Add</button>
			</div>
		</div>
	);
};

export default AddArticle;
