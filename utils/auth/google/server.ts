// ./utils/auth/google/server.ts

import { gqlServerClient } from "@/lib/gqlServerClient";
import { AuthData, MutationGoogleAuthArgs } from "@/types/gql/graphql";

const GOOGLE_AUTH_QUERY = `#graphql
mutation GoogleAuth($code: String!, $redirect_uri: String!) {
  googleAuth(code: $code, redirect_uri: $redirect_uri) {
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

const handleGetGoogleSession = async (input: MutationGoogleAuthArgs) => {
  return gqlServerClient.executeGraphQL()<
    { googleAuth: AuthData },
    MutationGoogleAuthArgs
  >({
    query: GOOGLE_AUTH_QUERY,
    variables: {
      code: input.code,
      redirect_uri: input?.redirect_uri,
    },
  });
};

export { handleGetGoogleSession };
