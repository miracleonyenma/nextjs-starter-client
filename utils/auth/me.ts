import { Query } from "@/types/gql/graphql";
import { gqlClient } from "@/lib/gqlClient";

export const USER_PART = `#graphql
  id
  firstName
  lastName
  picture
  email
  emailVerified
`;

export const ME_QUERY = `#graphql
query Me {
  me {
   ${USER_PART}
    roles {
      id
      name
    }
  }
}
`;

const getMe = async ({ token }: { token?: string }) => {
  return gqlClient.executeGraphQL()<{ me: Query["me"] }, undefined>({
    query: ME_QUERY,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default getMe;
