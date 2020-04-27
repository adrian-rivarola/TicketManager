const mongoose = require('mongoose');

// Se añadirán los demás campos más adelante
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	authToken: String,
	tickets: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Ticket'
	}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;