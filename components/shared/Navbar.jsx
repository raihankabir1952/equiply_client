
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { Menu, X, ArrowRight, LogOut } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Equipment", href: "/equipment" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: session, isPending } = useSession();

  // Logout functionality
  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await signOut();

      setIsOpen(false);
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  console.log("User role :", session?.user?.role);

  const dashboardLink = `/dashboard/${session?.user?.role}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 shadow-[0_8px_24px_rgba(20,43,69,0.06)] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo + Theme Toggle */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="shrink-0 overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35C77A]"
          >
            <Image
              src="/images/logoo.png"
              alt="Equiply"
              width={2350}
              height={1150}
              priority
              className="block h-14 w-auto scale-125 object-contain transition-transform duration-300 md:h-16 dark:hidden"
            />
            <Image
              src="/images/footerlogo.png"
              alt="Equiply"
              width={2350}
              height={1150}
              className="hidden h-14 w-auto scale-125 object-contain transition-transform duration-300 md:h-16 dark:block"
            />
          </Link>

          <ThemeToggle />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.name}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition duration-200 ease-out hover:bg-[#35C77A]/10 hover:text-[#142B45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A] after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-center after:rounded-full after:bg-[#35C77A] after:transition-transform after:duration-200 ${
                  isActive
                    ? "bg-[#35C77A]/10 text-[#142B45] after:scale-x-100"
                    : "text-slate-600 after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <p className="text-sm font-medium text-slate-500">Loading...</p>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Image
                src={session.user.image || "/images/default-avatar.png"}
                alt={session.user.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-[0_0_0_1px_rgba(20,43,69,0.12)]"
              />

              <div>
                <p className="max-w-32 truncate text-sm font-semibold text-[#142B45]">
                  {session.user.name}
                </p>
              </div>

              <Link
                href={dashboardLink}
                className="rounded-xl bg-[#142B45] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#1d3b5c] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
              >
                {session?.user?.role?.charAt(0).toUpperCase() +
                  session?.user?.role?.slice(1)} Dashboard
              </Link>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                title="Logout"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-600 transition duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <span>Logging out...</span>
                ) : (
                  <>
                    <LogOut size={16} />
                    Logout
                  </>
                )}
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#142B45] transition duration-200 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 rounded-xl bg-[#35C77A] px-5 py-2.5 text-sm font-semibold text-[#142B45] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#28b96c] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45]"
              >
                Register
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-slate-200 p-2.5 text-[#142B45] transition duration-200 hover:border-[#35C77A]/40 hover:bg-[#35C77A]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-[0_16px_24px_rgba(20,43,69,0.08)] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A] ${
                    isActive
                      ? "bg-[#35C77A]/10 text-[#142B45]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#142B45]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-3 border-t border-slate-100 pt-4">
            {isPending ? (
              <p className="py-2 text-sm font-medium text-slate-500">Loading...</p>
            ) : session ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={session.user.image || "/images/default-avatar.png"}
                    alt={session.user.name}
                    width={40}
                    height={40}
                    className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-[0_0_0_1px_rgba(20,43,69,0.12)]"
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
                  className="rounded-xl bg-[#142B45] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#1d3b5c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                >
                  {session?.user?.role?.charAt(0).toUpperCase() +
                    session?.user?.role?.slice(1)} Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  title="Logout"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-60"
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
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-[#142B45] transition duration-200 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-[#35C77A] px-4 py-3 text-center text-sm font-semibold text-[#142B45] shadow-sm transition duration-200 hover:bg-[#28b96c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45]"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
