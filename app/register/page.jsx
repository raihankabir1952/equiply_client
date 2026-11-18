
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Camera,
  ArrowRight,
} from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.")
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter."); setMessageType("error");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.")
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        setMessageType("error");
        return;
      }

      if (data) {
        toast.success("Account created successfully!")
        setTimeout(() => {
          router.push('/');
        }, 1500)
      }
    } catch (error) {
      console.error("Registration error:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7fbf8] px-5 py-10">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image
          src="/images/logoo.png"
          alt="Equiply"
          width={220}
          height={100}
          priority
          className="h-16 w-auto object-contain"
        />
      </Link>

      {/* Registration Card */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-[#142B45]/5 sm:p-8">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-[#142B45] sm:text-3xl">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join Equiply and start renting smarter.
          </p>
        </div>

        {/* Google Sign Up */}
        <button
          type="button"
          onClick={() => {
            setMessage("Google registration will be available soon.");
            setMessageType("error");
          }}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#142B45] transition hover:bg-slate-50"
        >
          <svg viewBox="0 0 48 48" className="h-5 w-5">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              transform="translate(0 5)"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.92 46.98 31.74 46.98 24.55Z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
              transform="translate(0 -1)"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.44-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">
            OR REGISTER WITH EMAIL
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#142B45]"
            >
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#142B45]"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
              />
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label
              htmlFor="photo"
              className="mb-2 block text-sm font-semibold text-[#142B45]"
            >
              Profile Photo
            </label>

            <label
              htmlFor="photo"
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 py-3 transition hover:border-[#35C77A] hover:bg-[#f7fbf8]"
            >
              <Camera size={20} className="text-[#23995A]" />

              <span className="truncate text-sm text-slate-500">
                {photo ? photo.name : "Choose a profile photo"}
              </span>

              <span className="ml-auto shrink-0 text-xs font-semibold text-[#23995A]">
                Browse
              </span>
            </label>

            <input
              id="photo"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="hidden"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#142B45]"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#142B45]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mt-1.5 text-xs text-slate-400">
              Minimum 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-[#142B45]"
            >
              Confirm Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#142B45]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#35C77A] px-5 py-3.5 text-sm font-bold text-[#142B45] transition hover:bg-[#42d98a] hover:shadow-lg hover:shadow-[#35C77A]/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}

            {!loading && (
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-[#23995A] hover:text-[#142B45]"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="mt-7 text-center text-xs text-slate-400">
        © 2026 Equiply. All rights reserved.
      </p>
    </main>
  );
}
