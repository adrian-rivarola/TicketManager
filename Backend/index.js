require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
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

const URI = process.env.MONGO_URI;
const OPS = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

mongoose.connect(URI, OPS, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	server.listen({port: 5000}).then(res => {
		console.log("Server running on: " + res.url);
	});

});


