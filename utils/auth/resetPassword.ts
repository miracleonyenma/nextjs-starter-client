import { gqlClient } from "@/lib/gqlClient";
import { MutationResetPasswordArgs } from "@/types/gql/graphql";

const RESET_PASSWORD_QUERY = `#graphql
mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password)
}
`;

const resetPassword = async (input: MutationResetPasswordArgs) => {
  return gqlClient.executeGraphQL()<
    {
      resetPassword: boolean;
    },
    MutationResetPasswordArgs
  >({
    query: RESET_PASSWORD_QUERY,
    variables: {
      token: input.token,
      password: input.password,
    },
  });
};

export default resetPassword;
