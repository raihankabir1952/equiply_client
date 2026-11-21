
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ConditionalLayout from "@/components/shared/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Equiply | Rent Smart. Do More.",
  description: "Rent Smart. Do More.",
};

// Runs before first paint so the saved theme is applied without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem("equiply-theme");var d=t==="dark";var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Suspense
          fallback={
            <div className="min-h-screen" />
          }
        >
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Suspense>

        <Toaster
          position="top-center"
          richColors
          closeButton
          duration={2000}
        />
      </body>
    </html>
  );
}
