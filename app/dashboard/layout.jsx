import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
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
                Customer Dashboard
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