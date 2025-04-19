// ./utils/auth/refreshToken.ts

import { gqlServerClient } from "@/lib/gqlServerClient";
import { Mutation, MutationRefreshTokenArgs } from "@/types/gql/graphql";

const REFERSH_TOKEN_MUTATION = `#graphql
mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    accessToken
  }
}
`;

const refreshToken = async (token: string) => {
  return gqlServerClient.executeGraphQL()<
    {
      refreshToken: Mutation["refreshToken"];
    },
    MutationRefreshTokenArgs
  >({
    query: REFERSH_TOKEN_MUTATION,
    variables: {
      token,
    },
  });
};

export default refreshToken;
