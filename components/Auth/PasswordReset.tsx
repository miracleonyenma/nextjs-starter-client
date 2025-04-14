import Loader from "@/components/Loader";
import resetPassword from "@/utils/auth/resetPassword";
import {
  ArrowLeft01Icon,
  SquareLockPasswordIcon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { logger } from "@untools/logger";
import { useFormik } from "formik";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const AuthResetPassword = () => {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const token = searchParams.get("token");

  const validatePassword = Yup.string()
    .min(8, "Password must be at least 8 characters")
    .test(
      "password",
      "Password must contain at least one uppercase, one lowercase, one number and one special character",
      (value) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
          value || ""
        );
      }
    )
    .required("Required");
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: validatePassword,
      confirmPassword: Yup.string().test(
        "passwords-match",
        "Passwords must match",
        function (value) {
          return this.parent.password === value;
        }
      ),
    }),
    onSubmit: async (values) => {
      logger.log("🥋🥋🥋🥋🥋🥋 ~ values: ", values);
      if (token)
        toast.promise(resetPassword({ password: values.password, token }), {
          loading: (() => {
            setLoading(true);
            return "Reseting password...";
          })(),
          success: (data) => {
            logger.log("data ~", data);

            return "Password reset successfully, you'll be redirected to login page";
          },
          error: (error) => {
            logger.error("🚨🚨🚨🚨🚨🚨 ~ error", error);

            return `Something went wrong: ${error}. You can try again by clicking the forgot password link in the login page`;
          },
          finally: () => {
            setLoading(false);
          },
        });
    },
  });
  return (
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
              Reset your password
            </h1>
          </div>
        </header>

        <div className="form-cont">
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="wrapper mx-auto flex w-full flex-col gap-4">
              <div className="form-control flex grow flex-col gap-2">
                {/* <label htmlFor="password">Password</label> */}
                <div className="form-input">
                  <HugeiconsIcon
                    icon={SquareLockPasswordIcon}
                    className="icon"
                    color="currentColor"
                    strokeWidth={2}
                  />
                  <input
                    aria-label="Password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn ghost"
                  >
                    <HugeiconsIcon
                      icon={ViewIcon}
                      className="icon"
                      color="currentColor"
                      strokeWidth={2}
                      altIcon={ViewOffIcon}
                      showAlt={showPassword}
                    />
                  </button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="form-error">
                    {/* <Danger variant="Bulk" color="currentColor" className="icon h-4 w-4" /> */}
                    <span className="dark:text-red-200">
                      {formik.errors.password}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="form-control flex grow flex-col gap-2">
                {/* <label htmlFor="password">Password</label> */}
                <div className="form-input">
                  <HugeiconsIcon
                    icon={SquareLockPasswordIcon}
                    className="icon"
                    color="currentColor"
                    strokeWidth={2}
                  />
                  <input
                    aria-label="Confirm password"
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...formik.getFieldProps("confirmPassword")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="btn ghost"
                  >
                    <HugeiconsIcon
                      icon={ViewIcon}
                      className="icon"
                      color="currentColor"
                      strokeWidth={2}
                      altIcon={ViewOffIcon}
                      showAlt={showConfirmPassword}
                    />
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="form-error">
                    {/* <Danger variant="Bulk" color="currentColor" className="icon h-4 w-4" /> */}
                    <span className="dark:text-red-200">
                      {formik.errors.confirmPassword}
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
                  Reset Password
                  <Loader loading={loading} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AuthResetPassword;
