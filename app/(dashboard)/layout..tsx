import { getUser } from "../lib/dal";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <main className="dashboard">
      {children}
      {JSON.stringify(user)}
    </main>
  );
}
