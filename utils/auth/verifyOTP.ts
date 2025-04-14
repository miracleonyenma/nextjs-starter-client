import { gqlClient } from "@/lib/gqlClient";
import { MutationVerifyOtpArgs, VerifyOtpInput } from "@/types/gql/graphql";

const VERIFY_OTP_QUERY = `#graphql
mutation VerifyOTP($input: VerifyOTPInput!) {
  verifyOTP(input: $input)
}`;

const verifyOTP = async (input: VerifyOtpInput) => {
  return gqlClient.executeGraphQL()<
    {
      verifyOTP: boolean;
    },
    MutationVerifyOtpArgs
  >({
    query: VERIFY_OTP_QUERY,
    variables: {
      input,
    },
  });
};

export default verifyOTP;
