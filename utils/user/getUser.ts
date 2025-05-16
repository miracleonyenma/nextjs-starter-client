// ./utils/user/getUser.ts

import { gqlClient } from "@/lib/gqlClient";
import { Query, QueryUserArgs } from "@/types/gql/graphql";
import { GET_USER_QUERY } from ".";

const getUser = async (id: string) => {
  return gqlClient.executeGraphQL()<{ user: Query["user"] }, QueryUserArgs>({
    query: GET_USER_QUERY,
    variables: {
      id,
    },
  });
};

export default getUser;
