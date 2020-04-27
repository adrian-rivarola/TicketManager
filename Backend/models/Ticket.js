const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event'
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	isValid: {
		type: Boolean,
		default: true
	}
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;