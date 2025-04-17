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
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  ArrowDownIcon,
  Book01Icon,
  Cancel01Icon,
  Comment01Icon,
  ComputerTerminal01Icon,
  Home01Icon,
  LifebuoyIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { JSX } from "react";
import AuthUserButton from "@/components/Auth/User/Button";
import { useUserStore } from "@/store/useUserStore";
import SiteLogo from "@/components/Site/Logo";

export function AppSidebar() {
  const { user } = useUserStore();
  const { toggleSidebar, isMobile } = useSidebar();

  // Menu items.

  const mainItems = [
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
      title: "Playground",
      url: "#",
      icon: (
        <HugeiconsIcon
          icon={ComputerTerminal01Icon}
          className="icon"
          color="currentColor"
          strokeWidth={2}
        />
      ),
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },

    {
      title: "Documentation",
      url: "#",
      icon: (
        <HugeiconsIcon
          icon={Book01Icon}
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
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
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
    <Sidebar variant="inset" collapsible="icon" className="pt-12">
      {isMobile && (
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <button className="btn ghost sm !p-0" onClick={toggleSidebar}>
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    className="icon"
                    color="currentColor"
                    strokeWidth={2}
                  />
                </button>
                <SiteLogo />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}
      <SidebarContent>
        <NavMain items={mainItems} />
        <NavSecondary items={secondaryItems} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <AuthUserButton user={user} expanded sidebar />
      </SidebarFooter>
    </Sidebar>
  );
}

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: JSX.Element;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon}
                  <span>{item.title}</span>
                  {item.items && (
                    <HugeiconsIcon
                      icon={ArrowDownIcon}
                      className="icon ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                      color="currentColor"
                      strokeWidth={2}
                    />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.items && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
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
  );
}
