const gql = require('graphql-tag');

module.exports = gql`
	type User {
		id: ID!
		username: String!
		authToken: String!
	}
	type Event {
		id: ID!
		organizer: User!
		name: String!
		description: String!
		date: String!
		location:String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassord: String!
	}
	input EventInput {
		name: String!
		description: String!
		date: String!
		location:String!
	}
	type Query {
		ver_eventos: [Event]!
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username:String! password:String!): User!
		crear_evento(eventInput:EventInput!): Event!
	}
`;