const Event = require('../../models/Event');
const User = require('../../models/User');

const validar_usuario = require('../../utils/validar_usuario');

async function crear_evento(_, { eventInput }, context) {
	const { id } = validar_usuario(context);

	const organizer = await User.findById(id);
	if (!organizer) {
		throw new Error('Operación no permitida');
	}

	const event = new Event({
		...eventInput,
		organizer
	});

	await event.save();
	return event;
}

async function ver_eventos(_, __, context) {
	const { id } = validar_usuario(context);

	const eventos = await Event.find({organizer: id}).populate('organizer', 'username');
	if (eventos.length === 0) {
		let user = await User.findById(id);
		if (!user)
			throw new Error('Usuario no encontrado');
	}

	return eventos || [];
}

module.exports = {
	Query: {
		ver_eventos
	},
	Mutation: {
		crear_evento
	}
}