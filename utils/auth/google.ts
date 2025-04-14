import { gqlServerClient } from "@/lib/gqlClient";
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

const getGoogleAuthURL = () => {
  const rootURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI as string,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  // logger.log("options", options);

  const qs = new URLSearchParams(options).toString();

  // logger.log("qs", qs);

  return `${rootURL}?${qs}`;
};

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

export { getGoogleAuthURL, handleGetGoogleSession };
