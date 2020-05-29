const { UserInputError } = require('apollo-server');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { validar_registro, validar_login } = require('../../utils/validar_input');
const User = require('../../models/User');

async function register(_, { registerInput }) {
  const { errors, valid } = validar_registro(registerInput);
  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }

  const { username, password } = registerInput;
  
  const user = await User.findOne({ username });
  if (user) {
    errors.username = 'Username already taken';
    throw new UserInputError('Username already taken!', { errors });
  }

  registerInput.password = await bcrypt.hash(password, 10);
  const newUser = new User(registerInput);
  newUser.authToken = jwt.sign({ id: newUser._id, username }, process.env.SECRET_KEY);

  await newUser.save();

  return newUser;
}

async function login(_, { username, password }) {
  const { errors, valid } = validar_login(username, password);
  if (!valid) {
    throw new UserInputError('Errors', { errors });
  }

  const user = await User.findOne({ username });
  if (!user) {
    errors.general = 'User not found';
    throw new UserInputError('User not found!', { errors });
  }
  
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    errors.general = 'Wrong password';
    throw new UserInputError('Wrong password!', { errors });
  }

  return user;
}

module.exports = {
  Mutation: {
    register,
    login
  }
}