// ./lib/gqlClient.ts

import { GraphQLClient } from "@untools/gql-client";
const gqlClient = new GraphQLClient({
  apiUrl: "/server/graphql",
});

export { gqlClient };
