const jwt = require('jsonwebtoken');

const { AuthenticationError } = require('apollo-server');

module.exports = context => {
	const authHeader = context.req.headers.authorization;

	if (!authHeader) {
		throw new AuthenticationError('Authorization required');
	}
	const token = authHeader.split('Bearer ')[1];
	if (!token) {
		throw new AuthenticationError('Invalid Token');
	}
	try {
		const user = jwt.verify(token, process.env.SECRET_KEY);
		return user;
	} catch(err) {
		throw new AuthenticationError('Invalid Token');
	}

}