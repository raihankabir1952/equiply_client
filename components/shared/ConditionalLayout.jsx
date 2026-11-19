
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();

    const hideNavbarFooter =
        pathname === "/login" ||
        pathname === "/register" ||
        pathname.startsWith("/dashboard");

    if (hideNavbarFooter) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </>
    );
}
