"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Comment01Icon,
  Home01Icon,
  InboxIcon,
  LifebuoyIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { JSX } from "react";
import AuthUserButton from "../Auth/User/Button";
import { useUserStore } from "@/store/useUserStore";

export function AppSidebar() {
  const { user } = useUserStore();
  // Menu items.
  const items = [
    {
      title: "Home",
      url: "#",
      icon: (
        <HugeiconsIcon
          icon={Home01Icon}
          className="icon"
          color="currentColor"
          strokeWidth={2}
        />
      ),
    },
    {
      title: "Inbox",
      url: "#",
      icon: (
        <HugeiconsIcon
          icon={InboxIcon}
          className="icon"
          color="currentColor"
          strokeWidth={2}
        />
      ),
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <HugeiconsIcon
          icon={Settings01Icon}
          className="icon"
          color="currentColor"
          strokeWidth={2}
        />
      ),
    },
  ];
  const secondaryItems = [
    {
      title: "Support",
      url: "#",
      icon: (
        <HugeiconsIcon
          icon={LifebuoyIcon}
          className="icon"
          color="currentColor"
          strokeWidth={2}
        />
      ),
    },
    {
      title: "Feedback",
      url: "#",
      icon: (
        <HugeiconsIcon
          icon={Comment01Icon}
          className="icon"
          color="currentColor"
          strokeWidth={2}
        />
      ),
    },
  ];
  return (
    <Sidebar variant="inset" collapsible="icon" className="pt-8">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavSecondary items={secondaryItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <AuthUserButton user={user} expanded small />
      </SidebarFooter>
    </Sidebar>
  );
}

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: JSX.Element;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
