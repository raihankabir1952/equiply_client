
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
    <main className="min-h-screen bg-[#f7fbf8] px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col items-center">

        {/* Logo */}
        <Link href="/" className="mb-7">
          <Image
            src="/images/logoo.png"
            alt="Equiply"
            width={250}
            height={120}
            priority
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Login Card */}
        <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg shadow-[#142B45]/5 sm:p-8">

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold text-[#142B45]">
              Welcome Back!
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Login to continue your Equiply journey.
            </p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 py-3 text-sm font-semibold text-[#142B45] transition hover:bg-gray-50"
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
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">
              OR LOGIN WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 transition focus-within:border-[#35C77A] focus-within:ring-2 focus-within:ring-[#35C77A]/10">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full py-3 text-sm text-[#142B45] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 transition focus-within:border-[#35C77A] focus-within:ring-2 focus-within:ring-[#35C77A]/10">
                <LockKeyhole size={18} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-3 text-sm text-[#142B45] outline-none placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 transition hover:text-[#142B45]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#35C77A]"
                />
                Remember me
              </label>

              <span className="text-xs text-gray-400">
                Forgot password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#142B45] py-3.5 text-sm font-semibold text-white transition hover:bg-[#35C77A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login to Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#35C77A] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

        <p className="mt-7 text-xs text-gray-400">
          © 2026 Equiply. All rights reserved.
        </p>
      </div>
    </main>
  );
}
