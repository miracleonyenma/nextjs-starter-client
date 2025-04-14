import { gqlClient } from "@/lib/gqlClient";
import { MutationRequestPasswordResetArgs } from "@/types/gql/graphql";

const REQUEST_PASSWORD_RESET_QUERY = `#graphql
mutation RequestPasswordReset($email: String!) {
  requestPasswordReset(email: $email)
}
`;

const requestPasswordReset = async (input: { email: string }) => {
  return gqlClient.executeGraphQL()<
    { requestPasswordReset: boolean },
    MutationRequestPasswordResetArgs
  >({
    query: REQUEST_PASSWORD_RESET_QUERY,
    variables: {
      email: input.email,
    },
  });
};

export default requestPasswordReset;
