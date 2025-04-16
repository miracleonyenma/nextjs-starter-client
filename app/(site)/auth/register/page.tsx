import AuthForm from "@/components/Auth/Form";
import Link from "next/link";

const AuthRegisterPage = () => {
  return (
    <section className="site-section py-24">
      <div className="wrapper">
        <header className="section-header mb-2">
          <h1 className="text-3xl font-bold lg:text-6xl">
            Sign up for a new account
          </h1>
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gray-600 underline">
              Sign in
            </Link>
          </p>
        </header>
        <div>
          <AuthForm type="register" />
        </div>
      </div>
    </section>
  );
};

export default AuthRegisterPage;
