import { gqlClient } from "@/lib/gqlClient";
import { Mutation, MutationDeleteUserArgs } from "@/types/gql/graphql";

const DELETE_USER_MUTATION = `#graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    firstName
    lastName
    picture
    email
    emailVerified
    phone
    phoneVerified
  }
}`;

const deleteUser = async (id: string) => {
  return gqlClient.executeGraphQL()<
    { deleteUser: Mutation["deleteUser"] },
    MutationDeleteUserArgs
  >({
    query: DELETE_USER_MUTATION,
    variables: {
      id,
    },
  });
};

export default deleteUser;
