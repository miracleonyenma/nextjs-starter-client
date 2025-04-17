import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/App/Sidebar";
import AppHeader from "@/components/App/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="dashboard [--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </main>
  );
}
