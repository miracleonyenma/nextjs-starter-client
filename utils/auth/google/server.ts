import { gqlServerClient } from "@/lib/gqlServerClient";
import { AuthData, MutationGoogleAuthArgs } from "@/types/gql/graphql";

const GOOGLE_AUTH_QUERY = `#graphql
mutation GoogleAuth($code: String!) {
  googleAuth(code: $code) {
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

const handleGetGoogleSession = async (input: { code: string }) => {
  return gqlServerClient.executeGraphQL()<
    { googleAuth: AuthData },
    MutationGoogleAuthArgs
  >({
    query: GOOGLE_AUTH_QUERY,
    variables: {
      code: input.code,
    },
  });
};

export { handleGetGoogleSession };
