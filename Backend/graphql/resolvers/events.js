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

async function ver_eventos() {
	const eventos = await Event.find({}).populate('organizer', 'username');
	// TODO: Agregar filtros según la fecha del evento
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