import { gqlClient } from "@/lib/gqlClient";
import { MutationSendOtpArgs, SendOtpInput } from "@/types/gql/graphql";

const SEND_VERIFICATION_OTP_QUERY = `#graphql
mutation SendOTP($input: SendOTPInput!) {
  sendOTP(input: $input)
}`;

const sendVerificationOTP = async (input: SendOtpInput) => {
  return gqlClient.executeGraphQL()<
    {
      sendOTP: string;
    },
    MutationSendOtpArgs
  >({
    query: SEND_VERIFICATION_OTP_QUERY,
    variables: {
      input,
    },
  });
};

export default sendVerificationOTP;
