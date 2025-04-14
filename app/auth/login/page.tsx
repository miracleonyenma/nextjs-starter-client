import AuthForm from "@/components/Auth/Form";
import Link from "next/link";

const AuthLoginPage = () => {
  return (
    <main>
      <section className="site-section py-24">
        <div className="wrapper">
          <header className="section-header mb-2">
            <h1 className="text-3xl font-bold lg:text-6xl">
              Hello! Sign in to your account
            </h1>
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-gray-600 underline">
                Sign up
              </Link>
            </p>
          </header>
          <div>
            <AuthForm type="login" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthLoginPage;
