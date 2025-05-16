// ./utils/users/index.ts

import { Query, QueryUsersArgs } from "@/types/gql/graphql";
import { GraphQLClient } from "@untools/gql-client";

const GET_USERS_QUERY = `#graphql
query Users($sort: SortInput, $filters: UserFiltersInput, $pagination: Pagination) {
  users(sort: $sort, filters: $filters, pagination: $pagination) {
    data {
      id
      firstName
      lastName
      picture
      email
      emailVerified
      phone
      phoneVerified
      roles {
        id
        name
      }
      wallets {
        meta {
          total
        }
        data {
          name
          symbol
          logo
        }
      }
    }
    meta {
      page
      limit
      pages
      total
      hasNextPage
      hasPrevPage
    }
  }
}
`;

export class UsersService {
  private client: GraphQLClient;

  constructor(client: GraphQLClient) {
    this.client = client;
  }

  async getUsers(args: QueryUsersArgs) {
    try {
      const data = await this.client.executeGraphQL()<
        { users: Query["users"] },
        QueryUsersArgs
      >({
        query: GET_USERS_QUERY,
        variables: args,
      });

      return data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }
}
