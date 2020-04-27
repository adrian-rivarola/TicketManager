require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req}) => ({req})
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


