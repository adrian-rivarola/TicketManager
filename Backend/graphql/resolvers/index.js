const users_resolvers = require('./users');

module.exports = {
	Query: {
		helloWorld: () => 'Hello World'
	},
	Mutation: {
		...users_resolvers.Mutation
	}
}