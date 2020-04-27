const users_resolvers = require('./users');
const events_resolvers = require('./events');

module.exports = {
	Query: {
		...events_resolvers.Query
	},
	Mutation: {
		...users_resolvers.Mutation,
		...events_resolvers.Mutation
	}
}