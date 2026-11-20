
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { error } from "better-auth/api";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed!");
        return;
      }

      if (data) {
        toast.success("Login successful! Welcome back.");

        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      });

      if (error) {
        toast.error(error.message || "Google login failed!");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f8f6] px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#35C77A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#142B45]/[0.06] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(20,43,69,0.12)] lg:min-h-[650px] lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="relative hidden overflow-hidden bg-[#142B45] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#35C77A]/10 blur-2xl" />

          <Link href="/" className="relative inline-flex w-fit">
            <Image
              src="/images/footerlogo.png"
              alt="Equiply"
              width={2350}
              height={1150}
              priority
              className="h-20 w-auto scale-125 object-contain"
            />
          </Link>

          <div className="relative max-w-md py-12">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold tracking-wide text-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-[#35C77A]" />
              EQUIPMENT RENTALS, MADE SIMPLE
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] xl:text-5xl">
              Make room for what you can do.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-slate-300">
              Find the equipment you need for your next project, or list your
              own and make it available to others.
            </p>
          </div>

          <p className="relative text-sm text-slate-400">
            Your next project starts with the right equipment.
          </p>
        </aside>

        <section className="flex items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-8 flex justify-center lg:hidden">
              <Image
                src="/images/logoo.png"
                alt="Equiply"
                width={250}
                height={120}
                priority
                className="h-16 w-auto object-contain"
              />
            </Link>

            <div className="mb-8">
              <p className="text-sm font-semibold text-[#35C77A]">
                Welcome back
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#142B45]">
                Sign in to Equiply
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Login to continue your Equiply journey.
              </p>
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-[#142B45] shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.3 1.2 8.5 3.3l6.3-6.3C34.9 2.5 29.9 0 24 0 14.6 0 6.5 5.4 3 13.3l7.4 5.7C12.2 13.1 17.6 9.5 24 9.5Z" />
                <path fill="#4285F4" d="M46.1 24.5c0-1.6-.2-3.1-.4-4.5H24v9h12.4c-.6 2.9-2.3 5.3-4.8 6.9l7.4 5.7c4.3-4 7.1-9.9 7.1-17.1Z" />
                <path fill="#FBBC05" d="M10.4 28.9c-.6-1.5-.9-3.2-.9-4.9s.3-3.4.9-4.9L3 13.3C1.1 16.5 0 20.1 0 24s1.1 7.5 3 10.7l7.4-5.8Z" />
                <path fill="#34A853" d="M24 48c5.9 0 10.9-1.9 14.6-5.2l-7.4-5.7c-2 1.3-4.4 2-7.2 2-6.4 0-11.8-3.6-13.6-9.1L3 35.7C6.5 42.6 14.6 48 24 48Z" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[0.68rem] font-semibold tracking-[0.12em] text-slate-400">
                OR LOGIN WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition duration-200 focus-within:border-[#35C77A] focus-within:ring-4 focus-within:ring-[#35C77A]/10">
                  <Mail size={18} className="shrink-0 text-slate-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-3.5 text-sm text-[#142B45] outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition duration-200 focus-within:border-[#35C77A] focus-within:ring-4 focus-within:ring-[#35C77A]/10">
                  <LockKeyhole size={18} className="shrink-0 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-3.5 text-sm text-[#142B45] outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-[#142B45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#35C77A]"
                  />
                  Remember me
                </label>

                <span className="text-xs font-medium text-slate-400">
                  Forgot password?
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#142B45] py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#35C77A] hover:text-[#142B45] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login to Account"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#23995A] transition hover:text-[#142B45] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </section>
      </div>

      <p className="relative mt-6 text-center text-xs text-slate-400">
        © 2026 Equiply. All rights reserved.
      </p>
    </main>
  );
}
