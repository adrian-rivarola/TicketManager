const jwt = require('jsonwebtoken');

const { AuthenticationError } = require('apollo-server');

module.exports = context => {
	const authHeader = context.req.headers.authorization;

	if (!authHeader) {
		throw new AuthenticationError('Autorización requerida');
	}
	const token = authHeader.split('Bearer ')[1];
	if (!token) {
		throw new AuthenticationError('Token inválido');
	}
	try {
		const user = jwt.verify(token, process.env.SECRET_KEY);
		return user;
	} catch(err) {
		console.error(err);
		throw new AuthenticationError('Token inválido');
	}

}