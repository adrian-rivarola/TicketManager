const gql = require('graphql-tag');

module.exports = gql`
	type User {
		id: ID!
		username: String!
		authToken: String!
		tickets: [Ticket]!
	}
	type Event {
		id: ID!
		organizer: User!
		name: String!
		description: String!
		date: String!
		location:String!
	}
	type Ticket {
		id: ID!
		event: Event!
		owner: User!
		isValid: Boolean!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
	}
	input EventInput {
		name: String!
		description: String!
		date: String!
		location:String!
	}
	input TicketInput {
		event: ID!
		owner: String!
	}
	type Query {
		ver_eventos: [Event]!
		ver_tickets: [Ticket]!
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username:String! password:String!): User!
		
		crear_evento(eventInput:EventInput!): Event!

		crear_ticket(ticketInput:TicketInput!): Ticket!
	}
`;