const gql = require('graphql-tag');

module.exports = gql`
	type User {
		id: ID!
		username: String!
		token: String!
	}
	type Query {
		helloWorld: String!
	}	
`;