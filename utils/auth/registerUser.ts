import { gqlClient } from "@/lib/gqlClient";
import { RegisterData, RegisterInput } from "@/types/gql/graphql";

const REGISTER_USER_QUERY = `#graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    user {
      id
      firstName
      lastName
      picture
      email
      emailVerified
    }
  }
}`;

const registerUser = async (input: RegisterInput) => {
  return gqlClient.executeGraphQL()<
    { register: RegisterData },
    { input: RegisterInput }
  >({
    query: REGISTER_USER_QUERY,
    variables: {
      input,
    },
  });
};

export default registerUser;
