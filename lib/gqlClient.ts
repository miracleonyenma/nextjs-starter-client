// ./lib/gqlClient.ts

import { GraphQLClient } from "@untools/gql-client";
const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API;
const API_KEY = process.env.API_KEY;
const gqlClient = new GraphQLClient({
  apiUrl: "/server/graphql",
});

const gqlServerClient = new GraphQLClient({
  apiUrl: GRAPHQL_API_URL,
  apiKey: API_KEY,
});

export { gqlClient, gqlServerClient };
