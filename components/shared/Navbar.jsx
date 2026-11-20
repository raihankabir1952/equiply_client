"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Menu, X, ArrowRight, LogOut } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Equipment", href: "/equipment" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const { data: session, isPending } = useSession();

  //logout functionality
  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  console.log("User role :", session?.user?.role);
  const dashboardLink = `/dashboard/${session?.user?.role}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-1 lg:px-8">

        {/* Logo */}
        <Link href="/" className="shrink-0 overflow-hidden">
          <Image
            src="/images/logoo.png"
            alt="Equiply"
            width={2350}
            height={1150}
            priority
            className="h-12 w-auto scale-125 object-contain md:h-16"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium text-slate-600 transition-colors hover:text-[#35C77A]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Image
                src={session.user.image || "/images/default-avatar.png"}
                alt={session.user.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-slate-200 object-cover"
              />

              <div>
                <p className="text-sm font-semibold text-[#142B45]">
                  {session.user.name}
                </p>
              </div>

              <Link
                href={dashboardLink}
                className="rounded-lg bg-[#142B45] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d3b5c]"
              >
                {session?.user?.role?.charAt(0).toUpperCase() +
                  session?.user?.role?.slice(1)} Dashboard
              </Link>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Logout"
                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? (
                  <span className="text-sm">Logging out...</span>
                ) : (
                  <LogOut size={20} />
                )}
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-[#142B45] transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 rounded-lg bg-[#35C77A] px-5 py-2 text-sm font-semibold text-[#142B45] transition hover:bg-[#28b96c]"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#142B45] hover:bg-slate-100 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#35C77A]"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
            {isPending ? (
              <p className="py-2 text-sm text-slate-500">Loading...</p>
            ) : session ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={session.user.image || "/images/default-avatar.png"}
                    alt={session.user.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-[#142B45]">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardLink}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-[#142B45] px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  {session?.user?.role?.charAt(0).toUpperCase() +
                    session?.user?.role?.slice(1)} Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  title="Logout"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    "Logging out..."
                  ) : (
                    <>
                      <LogOut size={18} />
                      Logout
                    </>
                  )}
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="rounded-lg px-4 py-2 text-center font-semibold text-[#142B45]">
                  Login
                </Link>

                <Link href="/register" className="rounded-lg bg-[#35C77A] px-4 py-3 text-center font-semibold text-[#142B45]">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
