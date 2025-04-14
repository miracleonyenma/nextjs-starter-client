"use client";

import VerifyEmailPage from "@/components/Auth/VerifyPage";
import { Suspense } from "react";

const VerifyEmail = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailPage />
      </Suspense>
    </>
  );
};

export default VerifyEmail;
