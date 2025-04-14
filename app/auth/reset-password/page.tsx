"use client";

import AuthResetPassword from "@/components/Auth/PasswordReset";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <AuthResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
