const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
	type Query {
		helloWorld: String!
	}`;

const resolvers = {
	Query: {
		helloWorld: () => 'Hello World'
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
});


server.listen({port: 5000}).then(res => {
	console.log("Server running on: " + res.url);
});
