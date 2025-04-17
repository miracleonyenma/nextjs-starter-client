// ./components/Auth/LogoutPage.tsx

"use client";

import { logoutAction } from "@/app/actions";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const { setUser } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    logoutAction();
    // Client-side user state cleanup
    setUser(null);

    // Redirect after a short delay to allow the user to see the logout message
    const timer = setTimeout(() => {
      router.push("/");
      router.refresh(); // Force refresh to update navigation state
    }, 1000);

    return () => clearTimeout(timer);
  }, [setUser, router]);

  return (
    <section className="site-section flex w-full flex-col max-lg:px-0 lg:justify-center">
      <div className="wrapper">
        <header className="section-header my-12">
          <div className="wrapper">
            <h1 className="mb-2 text-xl font-bold lg:text-5xl">
              Logging out...
            </h1>
          </div>
        </header>
      </div>
    </section>
  );
};

export default LogoutPage;
