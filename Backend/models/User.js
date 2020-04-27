const mongoose = require('mongoose');

// Se añadirán los demás campos más adelante
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	authToken: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;