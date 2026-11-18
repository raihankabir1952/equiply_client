
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
    LayoutDashboard,
    CalendarDays,
    Heart,
    UserRound,
    PlusCircle,
    Package,
    ClipboardList,
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

// Customer Menu
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

// Owner Menu
const ownerMenu = [
    {
        title: "Add Equipment",
        url: "/dashboard/owner/add-equipment",
        icon: PlusCircle,
    },
    {
        title: "My Equipment",
        url: "/dashboard/owner/equipment",
        icon: Package,
    },
    {
        title: "My Equipment Rental",
        url: "/dashboard/owner/rentals",
        icon: ClipboardList,
    },
    {
        title: "My Profile",
        url: "/dashboard/owner/profile",
        icon: UserRound,
    },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    const isOwner = pathname.startsWith("/dashboard/owner");

    const menuItems = isOwner ? ownerMenu : customerMenu;

    const dashboardTitle = isOwner
        ? "Owner Dashboard"
        : "Customer Dashboard";

    return (
        <Sidebar className="!absolute !h-auto">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        {dashboardTitle}
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
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
