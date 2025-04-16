"use client";

import Link from "next/link";
import SiteLogo from "@/components/Site/Logo";
import { useUserStore } from "@/store/useUserStore";
import AuthUserButton from "../Auth/User/Button";
import { SidebarTrigger } from "../ui/sidebar";

const AppHeader = () => {
  const { user } = useUserStore();

  return (
    <header className="app-header sticky top-0 z-30 w-full p-4 py-2">
      <div className="wrapper mx-auto flex  justify-between gap-4">
        <div className="flex gap-2 items-center">
          <SidebarTrigger />

          <Link href="/">
            <SiteLogo />
          </Link>
        </div>

        <nav className="site-nav">
          <div className="wrapper h-full">
            <ul className="flex h-full flex-wrap items-center gap-4">
              {!user && (
                <li className="flex items-center">
                  <Link href="/auth/login">Login</Link>
                </li>
              )}
              <li className="flex items-center">
                <AuthUserButton user={user} />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
