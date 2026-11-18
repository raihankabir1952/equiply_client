
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Heart,
  UserRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const customerMenu = [
  {
    title: "Overview",
    url: "/dashboard/customer",
    icon: LayoutDashboard,
  },
  {
    title: "My Rentals",
    url: "/dashboard/customer/rentals",
    icon: CalendarDays,
  },
  {
    title: "Favorites",
    url: "/dashboard/customer/favorites",
    icon: Heart,
  },
  {
    title: "Profile",
    url: "/dashboard/customer/profile",
    icon: UserRound,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="!absolute !h-auto">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Customer Dashboard</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {customerMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={pathname === item.url}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
