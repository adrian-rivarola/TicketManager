const mongoose = require('mongoose');

const evenstSchema = new mongoose.Schema({
	organizer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: String,
	description: String,
	date: String,
	location: String
});

const Event = mongoose.model('Event', evenstSchema);

module.exports = Event;