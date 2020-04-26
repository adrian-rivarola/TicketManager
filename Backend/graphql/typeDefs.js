const gql = require('graphql-tag');

module.exports = gql`
	type Query {
		helloWorld: String!
	}	
`;