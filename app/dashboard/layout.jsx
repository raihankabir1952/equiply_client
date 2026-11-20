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
import styles from "./dashboard.module.css";

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

      <SidebarProvider className="relative flex-1 bg-slate-50">
        <div className="flex w-full flex-1">
          <DashboardSidebar />

          <SidebarInset className="min-w-0 !bg-[#f6f8fb]">
            <header className="sticky top-20 z-30 flex h-14 items-center border-b border-slate-200/80 bg-white/95 px-4 shadow-[0_4px_14px_rgba(20,43,69,0.04)] backdrop-blur sm:h-16 sm:px-6">
              <SidebarTrigger className="h-9 w-9 rounded-xl border border-slate-200 text-[#142B45] shadow-sm transition hover:bg-slate-50" />
              <span className="ml-3 text-sm font-semibold tracking-tight text-[#142B45] sm:text-base">
                {dashboardTitle}
              </span>
            </header>

            <main className={`${styles.dashboardContent} flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8`}>
              {children}
            </main>
            <Footer />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}