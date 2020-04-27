const Ticket = require('../../models/Ticket');
const Event = require('../../models/Event');
const User = require('../../models/User');

const validar_usuario = require('../../utils/validar_usuario');

async function ver_tickets(_, __, context) {
	const { id } = validar_usuario(context);

	const user = await User.findById(id).populate({
		path: 'tickets',
		populate: { path: 'event' }
	});
	if (!user) {
		throw new Error('Usuario no encontrado');
	}
	
	return user.tickets;
}

async function crear_ticket(_, { ticketInput }, context) {
	const { id } = validar_usuario(context);
	
	const event = await Event.findById(ticketInput.event);
	if (!event) {
		throw new Error('Evento no encontrado');
	}
	if (event.organizer.toString() !== id) {
		throw new Error('Operación no permitida');
	}

	const owner = await User.findOne({ username: ticketInput.owner });
	if (!owner) {
		throw new Error('Usuario no encontrado');
	}

	const ticket = new Ticket({ event, owner });

	owner.tickets.unshift(ticket._id);
	await owner.save();

	await ticket.save();
	return ticket
}

module.exports = {
	Query: {
		ver_tickets
	},
	Mutation: {
		crear_ticket
	}
}