class UnprocessableEntityException extends Error {
	constructor(errors) {
		super('Invalid input data');
		this.name = 'UnprocessableEntityException';
		this.errors = errors;
	}
}

module.exports = UnprocessableEntityException;
