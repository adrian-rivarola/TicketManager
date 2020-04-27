const users_resolvers = require('./users');
const events_resolvers = require('./events');
const tickets_resolvers = require('./tickets');

module.exports = {
	Query: {
		...events_resolvers.Query,
		...tickets_resolvers.Query
	},
	Mutation: {
		...users_resolvers.Mutation,
		...events_resolvers.Mutation,
		...tickets_resolvers.Mutation
	}
}