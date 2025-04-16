import { gqlClient } from "@/lib/gqlClient";
import { Mutation, MutationUpdateUserArgs } from "@/types/gql/graphql";

const UPDATE_USER_QUERY = `#graphql
mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    firstName
    lastName
    picture
    email
    emailVerified
  }
}`;

const updateUser = async (input: MutationUpdateUserArgs["input"]) => {
  return gqlClient.executeGraphQL()<
    { updateUser: Mutation["updateUser"] },
    MutationUpdateUserArgs
  >({
    query: UPDATE_USER_QUERY,
    variables: {
      input,
    },
  });
};

export default updateUser;
