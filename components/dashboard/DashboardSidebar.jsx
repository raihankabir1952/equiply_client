
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
    UsersIcon,
    ChartNoAxesCombined,
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
        title: "Analytics",
        url: "/dashboard/owner/analytics",
        icon: ChartNoAxesCombined
    },
    {
        title: "My Profile",
        url: "/dashboard/owner/profile",
        icon: UserRound,
    },
];

// Admin Menu
const adminMenu = [
    {
        title: "All Users",
        url: "/dashboard/admin/users",
        icon: UsersIcon,
    },
    {
        title: "All Equipment",
        url: "/dashboard/admin/equipment",
        icon: Package,
    },
    {
        title: "All Rentals",
        url: "/dashboard/admin/rentals",
        icon: ClipboardList,
    },
    {
        title: "Analytics",
        url: "/dashboard/admin/analytics",
        icon: ChartNoAxesCombined,
    },
    {
        title: "My Profile",
        url: "/dashboard/admin/profile",
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

    const isAdmin = pathname.startsWith("/dashboard/admin");
    const isOwner = pathname.startsWith("/dashboard/owner");

    const menuItems = isAdmin
        ? adminMenu
        : isOwner
            ? ownerMenu
            : customerMenu;

    const dashboardTitle = isAdmin
        ? "Admin Dashboard"
        : isOwner
            ? "Owner Dashboard"
            : "Customer Dashboard";

    return (
        <Sidebar className="!top-20 !h-[calc(100svh-5rem)] border-r border-slate-200/80 bg-white shadow-[4px_0_18px_rgba(20,43,69,0.03)]">
            <SidebarContent className="px-2 py-5">
                <SidebarGroup className="gap-2">
                    <SidebarGroupLabel className="h-auto px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-slate-400">
                        {dashboardTitle}
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        render={<Link href={item.url} />}
                                        size="lg"
                                        isActive={
                                            pathname === item.url ||
                                            (item.url === "/dashboard/admin/analytics" &&
                                                pathname.startsWith("/dashboard/admin/analytics/"))
                                        }
                                        className="mx-1 w-[calc(100%-0.5rem)] rounded-xl px-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-[#142B45] data-active:bg-emerald-50 data-active:font-semibold data-active:text-[#142B45] focus-visible:ring-2 focus-visible:ring-[#35C77A]/40 [&_svg]:text-slate-400 data-active:[&_svg]:text-[#35C77A]"
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
