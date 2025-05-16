export const GET_USER_QUERY = `#graphql
query User($id: ID!) {
  user(id: $id) {
    id
    firstName
    lastName
    picture
    email
    emailVerified
    phone
    phoneVerified
    roles {
      id
      name
    }
  }
}
`;
