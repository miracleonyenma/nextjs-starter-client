"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const AuthFailurePage: React.FC = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const error = searchParams.get("error");

  return (
    <main className="min-h-screen">
      <section className="site-section py-24">
        <div className="wrapper">
          <header className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Authentication failed</h1>
            {name && error && (
              <p>
                {name} authentication failed. Error: {error}
              </p>
            )}
          </header>
          <div className="mt-8">
            {/* Redirect to login page */}
            <Link href="/auth/login" className="btn primary">
              Try again
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
export default AuthFailurePage;
