const Ticket = require('../../models/Ticket');
const Event = require('../../models/Event');
const User = require('../../models/User');

const validar_usuario = require('../../utils/validar_usuario');

async function crear_ticket(_, { ticketInput }, context) {
	const { id } = validar_usuario(context);
	
	const event = await Event.findById(ticketInput.event);
	if (!event) {
		throw new Error('Evento no encontrado');
	}
	if (event.organizer.toString() !== id) {
		throw new Error('Operación no permitida');
	}

	const owner = await User.findById(ticketInput.owner);
	if (!owner) {
		throw new Error('Usuario no encontrado');
	}

	const ticket = new Ticket({ event, owner });

	await ticket.save();
	return ticket
}

module.exports = {
	Mutation: {
		crear_ticket
	}
}