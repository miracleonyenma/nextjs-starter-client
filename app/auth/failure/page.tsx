import AuthFailurePage from "@/components/Auth/FailurePage";
import { Suspense } from "react";

const AuthFailure = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthFailurePage />
    </Suspense>
  );
};

export default AuthFailure;
