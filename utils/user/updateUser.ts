// ./utils/user/updateUser.ts

import { gqlClient } from "@/lib/gqlClient";
import { Mutation, MutationUpdateUserArgs } from "@/types/gql/graphql";

const UPDATE_USER_QUERY = `#graphql
mutation UpdateUser($id: ID, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    firstName
    lastName
    picture
    email
    emailVerified
  }
}`;

const updateUser = async (args: MutationUpdateUserArgs) => {
  return gqlClient.executeGraphQL()<
    { updateUser: Mutation["updateUser"] },
    MutationUpdateUserArgs
  >({
    query: UPDATE_USER_QUERY,
    variables: {
      ...args,
    },
  });
};

export default updateUser;
