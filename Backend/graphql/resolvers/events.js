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

module.exports = {
	Mutation: {
		crear_evento
	}
}