import gql from 'graphql-tag';

const validar_ticket_mutation = gql`
  mutation($id:ID!) {
    validar_ticket(id: $id) {
      id
      event {
        id
        name
        description
        date
        location
      }
      owner {
        id
        username
      }
    }
  }
`;

export default validar_ticket_mutation;