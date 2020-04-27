const gql = require('graphql-tag');

module.exports = gql`
	type User {
		id: ID!
		username: String!
		authToken: String!
	}
	input RegisterInput {
		username: String!
		password: String!
		confirmPassord: String!
	}
	type Query {
		helloWorld: String!
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(username:String! password:String!): User!
	}
`;