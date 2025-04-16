import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="site-section">
        <div className="wrapper flex flex-col items-center gap-4">
          <h1 className="text-center text-5xl font-bold lg:text-8xl">
            Starter Next.js Website
          </h1>
          <p className="mx-auto text-center text-lg lg:w-4/5 lg:text-xl">
            This is a starter template for a Next.js website. It includes all
            the essential features for integration with the express-graphql api
          </p>
          <Link href={"/auth/register"} className="btn primary lg">
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
