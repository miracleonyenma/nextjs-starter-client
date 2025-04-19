import { gqlClient } from "@/lib/gqlClient";
import { gqlServerClient } from "@/lib/gqlServerClient";
import { AuthData, LoginInput, MutationLoginArgs } from "@/types/gql/graphql";

const LOGIN_USER_QUERY = `#graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
    user {
      id
      firstName
      lastName
      email
      emailVerified
      picture
      roles {
        id
        name
      }
    }
  }
}
`;

const loginUser = async (input: LoginInput) => {
  return gqlClient.executeGraphQL()<{ login: AuthData }, MutationLoginArgs>({
    query: LOGIN_USER_QUERY,
    variables: {
      input,
    },
  });
};

export const serverLoginUser = async (input: LoginInput) => {
  return gqlServerClient.executeGraphQL()<
    { login: AuthData },
    MutationLoginArgs
  >({
    query: LOGIN_USER_QUERY,
    variables: {
      input,
    },
  });
};

export default loginUser;
