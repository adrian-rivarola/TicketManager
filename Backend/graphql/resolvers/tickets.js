const Ticket = require('../../models/Ticket');
const Event = require('../../models/Event');
const User = require('../../models/User');

const validar_usuario = require('../../utils/validar_usuario');

async function tickets(_, __, context) {
	const { id } = validar_usuario(context);

	const user = await User.findById(id).populate({
		path: 'tickets',
		populate: { path: 'event' }
	});
	if (!user) {
		throw new Error('User not found');
	}
	
	return user.tickets;
}

async function crear_ticket(_, { ticketInput }, context) {
	const { id } = validar_usuario(context);
	
	const event = await Event.findById(ticketInput.event);
	if (!event) {
		throw new Error('Event not found');
	}
	if (event.organizer.toString() !== id) {
		throw new Error('Operation not allowed');
	}

	const owner = await User.findOne({ username: ticketInput.owner });
	if (!owner) {
		throw new Error('User not found');
	}

	const ticket = new Ticket({ event, owner });

	owner.tickets.unshift(ticket._id);
	await owner.save();

	await ticket.save();
	return ticket
}

async function validar_ticket(_, { id: ticket_id }, context) {
	const { id } = validar_usuario(context);

	const ticket = await Ticket.findById(ticket_id).populate('event').populate('owner');
	if (!ticket || !ticket.isValid) {
		throw new Error('Invalid Ticket');
	}

	if (ticket.event.organizer.toString() !== id) {
		throw new Error('This ticket is for another Event!');
	}

	return ticket;
}

module.exports = {
	Query: {
		tickets
	},
	Mutation: {
		crear_ticket,
		validar_ticket
	}
}