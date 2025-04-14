export default function Auth({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <>
      <main className="site-main">{children}</main>
    </>
  );
}
