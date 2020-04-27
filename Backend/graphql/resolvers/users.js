const { UserInputError } = require('apollo-server');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// TODO: Agregar validaciones para datos enviados por el usuario

async function register(_, { registerInput }) {
	const { username, password } = registerInput;
	
	const user = await User.findOne({ username });
	if (user) {
		throw new UserInputError('Nombre de usuario ya existe!');
	}

	registerInput.password = await bcrypt.hash(password, 10);
	const newUser = new User(registerInput);
	newUser.authToken = jwt.sign({ id: newUser._id, username }, process.env.SECRET_KEY);

	await newUser.save();

	return newUser;
}

async function login(_, { username, password }) {
	const user = await User.findOne({ username });
	if (!user) {
		throw new UserInputError('Usuario no encontrado!');
	}
	
	const correctPassword = await bcrypt.compare(password, user.password);
	if (!correctPassword) {
		throw new UserInputError('Contraseña incorrecta!');
	}

	return user;
}

module.exports = {
	Mutation: {
		register,
		login
	}
}