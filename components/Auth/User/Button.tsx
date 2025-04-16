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

const AuthUserButton: React.FC<{ user?: User | null }> = ({ user }) => {
  const router = useRouter();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useShortcut("k", () => {
    console.log("log out");
    setLogoutDialogOpen(true);
  });

  return (
    <>
      {user?.id ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="btn ghost !p-0">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage
                  src={user?.picture || "https://github.com/shadcn.png"}
                  alt={user?.firstName || "user"}
                />
                <AvatarFallback>
                  <span className="uppercase">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </span>
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>
              <div className="flex flex-col p-2">
                <span className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-sm text-gray-400">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="px-4 py-3" asChild>
                <Link href={"/account"}>Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-3" asChild>
                <Link href={"/notes"}>Notes</Link>
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
