// ./utils/user/getUser.ts

import { gqlServerClient } from "@/lib/gqlServerClient";
import { Query, QueryUserArgs } from "@/types/gql/graphql";
import { GET_USER_QUERY } from "@/utils/user";

const getUser = async (id: string) => {
  return gqlServerClient.executeGraphQL()<
    { user: Query["user"] },
    QueryUserArgs
  >({
    query: GET_USER_QUERY,
    variables: {
      id,
    },
  });
};

export default getUser;
