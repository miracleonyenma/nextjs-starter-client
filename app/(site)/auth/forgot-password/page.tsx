"use client";

import Loader from "@/components/Loader";
import requestPasswordReset from "@/utils/auth/requestPasswordReset";
import { ArrowLeft01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { logger } from "@untools/logger";

import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const ForgotPassword = () => {
  useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      logger.log("🥋🥋🥋🥋🥋🥋 ~ values: ", values);

      toast.promise(requestPasswordReset({ email: values.email }), {
        loading: (() => {
          setLoading(true);
          return "Requesting password reset...";
        })(),
        success: (data) => {
          logger.log("data ~", data);

          return "Success! Password reset link sent to your email";
        },
        error: (error) => {
          logger.error("🚨🚨🚨🚨🚨🚨 ~ error", error);

          return `Something went wrong: ${error}`;
        },
        finally: () => {
          setLoading(false);
        },
      });
    },
  });
  return (
    <main>
      <section className="site-section">
        <div className="wrapper">
          <header className="section-header my-12">
            <div className="wrapper flex flex-col items-start gap-4">
              <Link className="btn ghost" href="/auth/login">
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  className="icon"
                  color="currentColor"
                  strokeWidth={2}
                />
                Back to login
              </Link>
              <h1 className="mb-2 text-xl font-bold lg:text-5xl">
                Forgot Password
              </h1>
            </div>
          </header>

          <div className="form-cont">
            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="wrapper mx-auto flex w-full flex-col gap-4">
                <div className="form-control flex grow flex-col gap-2">
                  {/* <label htmlFor="email">Password</label> */}
                  <div className="form-input">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      className="icon"
                      color="currentColor"
                      strokeWidth={2}
                    />
                    <input
                      aria-label="Confirm email"
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
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
                    Continue
                    <Loader loading={loading} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
