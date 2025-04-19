"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/gql/graphql";
import Link from "next/link";
import { useState } from "react";
import useShortcut from "@/hooks/useShortcut";
import { AuthUserLogoutDialog } from "@/components/Auth/User/LogoutDialog";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { logger } from "@untools/logger";

const UserInfo: React.FC<{ user?: User | null; small?: boolean }> = ({
  user,
  small = false,
}) => {
  return (
    <div className="flex flex-col p-2">
      <span
        className={`text truncate text-left font-semibold ${small ? "text-sm" : ""}`}
      >
        {user?.firstName} {user?.lastName}
      </span>
      <span
        className={`truncate text-sm text-gray-400 ${small ? "text-xs" : ""}`}
      >
        {user?.email}
      </span>
    </div>
  );
};

const AuthUserButton: React.FC<{
  user?: User | null;
  expanded?: boolean;
  sidebar?: boolean;
}> = ({ user, expanded = false, sidebar = false }) => {
  const router = useRouter();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const BtnContent = (
    <>
      <Avatar className="h-8 w-8 rounded-full">
        <AvatarImage
          src={user?.picture || "https://github.com/shadcn.png"}
          alt={user?.firstName || "user"}
        />
        <AvatarFallback>
          <span className="uppercase">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </span>
        </AvatarFallback>
      </Avatar>
      {expanded && <UserInfo user={user} small={sidebar} />}
    </>
  );

  useShortcut("k", () => {
    logger.log("log out");
    setLogoutDialogOpen(true);
  });

  return (
    <>
      {user?.id ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {sidebar ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-1"
              >
                {BtnContent}
              </SidebarMenuButton>
            ) : (
              <button className="btn ghost flex items-center gap-2 !p-0">
                {BtnContent}
              </button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>
              <UserInfo user={user} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="px-4 py-3" asChild>
                <Link href={"/account"}>Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-3" asChild>
                <Link href={"/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-3" disabled>
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="px-4 py-3"
              onClick={() => {
                setLogoutDialogOpen(true);
              }}
            >
              Log out
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/auth/register" className="btn md primary">
          Sign Up
        </Link>
      )}

      <AuthUserLogoutDialog
        open={logoutDialogOpen}
        setOpen={setLogoutDialogOpen}
        canProceed={() => {
          router.push("/auth/logout");
        }}
      />
    </>
  );
};

export default AuthUserButton;
