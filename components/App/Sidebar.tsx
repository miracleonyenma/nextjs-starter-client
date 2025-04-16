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
  Home01Icon,
  InboxIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function AppSidebar() {
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
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
