import { useRouter, useSearchParams } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { AnimatePresence, motion } from "motion/react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import sendVerificationOTP from "@/utils/auth/sendVerificationOTP";
import verifyOTP from "@/utils/auth/verifyOTP";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import { logger } from "@untools/logger";
const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const sent = searchParams.get("sent");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(email);
  const [sentEmail, setSentEmail] = useState<boolean>(sent === "true");

  const validationSchema = Yup.object({
    email: Yup.string().email("Please enter a valid email address"),
  });

  const formik = useFormik({
    initialValues: {
      email: email || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      logger.log({ values });
      toast.promise(sendVerificationOTP({ email: values.email }), {
        loading: (() => {
          setLoading(true);
          return "Sending verifcation code to your mail...";
        })(),
        success: (data) => {
          logger.log("🪵🪵🪵🪵🪵 ~ sendVerificationOTP data:", data);
          setUserEmail(values.email);
          setSentEmail(true);
          return "Verfication code sent successfully!";
        },
        error: (err) => {
          logger.log("🚨🚨🚨🚨🚨🚨 ~ sendVerificationOTP err: ", err);

          return (
            err ||
            "Something went wrong while sending the code, try again later"
          );
        },
        finally: () => {
          setLoading(false);
        },
      });
    },
  });

  const handleVerifyEmail = () => {
    logger.log("time to verify", userEmail);

    if (userEmail && value.trim()) {
      toast.promise(
        verifyOTP({
          email: userEmail,
          otp: value.toUpperCase(),
        }),
        {
          loading: (() => {
            setLoading(true);
            return "Verifying your email address...";
          })(),
          success: (data) => {
            logger.log("🪵🪵🪵🪵🪵 ~ verifyEmail data:", data);

            router.push("/auth/login");
            return "Email successfully verified, redirecting you to login...";
          },
          error: (error) => {
            logger.error({ error });
            setValue("");
            return `Something went wrong: ${error}`;
          },
          finally: () => {
            setLoading(false);
          },
        }
      );
    } else {
      toast.error("Please make sure the email and OTP is entered correctly");
    }
  };

  return (
    <section className="site-section flex w-full flex-col lg:justify-center">
      <div className="wrapper">
        <header className="section-header my-12">
          <div className="wrapper">
            <h1 className="mb-2 text-xl font-bold lg:text-5xl">
              Verify your email address
            </h1>
            <p>
              Enter the code that was sent to <strong>{email}</strong> to
              confirm your email address.
            </p>
          </div>
        </header>
        <AnimatePresence>
          {userEmail && sentEmail ? (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              className="flex flex-col gap-6"
            >
              <InputOTP
                type="text"
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup className="flex gap-2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="form-input !rounded-xl p-6 text-lg capitalize lg:text-2xl"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <div className="action-cont flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setUserEmail(null);
                  }}
                  className="btn secondary"
                >
                  Back
                </button>
                <button onClick={handleVerifyEmail} className="btn primary">
                  Verify
                  <Loader loading={loading} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              onSubmit={formik.handleSubmit}
            >
              <div className="wrapper flex flex-col gap-4">
                <div className="form-control flex grow flex-col gap-2">
                  {/* <label htmlFor="email">Email Address</label> */}
                  <div className="form-input">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      className="icon"
                      color="currentColor"
                      strokeWidth={2}
                    />
                    <input
                      aria-label="Email Address"
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="form-error">
                      {/* <Danger variant="Bulk" color="currentColor" className="icon h-4 w-4" /> */}
                      <span className="dark:text-red-200">
                        {formik.errors.email}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="action-cont">
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn primary"
                  >
                    {!loading ? "Send code" : "Sending code..."}
                    <Loader loading={loading} />{" "}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VerifyEmailPage;
