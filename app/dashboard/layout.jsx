'use client'

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { usePathname } from "next/navigation";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const dashboardTitle = pathname.startsWith("/dashboard/admin")
    ? "Admin Dashboard"
    : pathname.startsWith("/dashboard/owner")
      ? "Owner Dashboard"
      : "Customer Dashboard";
  return (
    <>
      <Navbar />

      <SidebarProvider className="relative flex-1">
        <div className="flex w-full flex-1">
          <DashboardSidebar />

          <SidebarInset>
            <header className="flex h-14 items-center border-b px-4">
              <SidebarTrigger />
              <span className="ml-3 font-semibold">
                {dashboardTitle}
              </span>
            </header>

            <main className="flex-1 p-6">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <Footer />
    </>
  );
}