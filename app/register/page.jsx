
"use client";

import { apiFetch } from "@/lib/api";
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
import { useSession } from "@/lib/auth-client";

export default function RegisterPage() {
  const { refetch } = useSession();
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

    // Step 1: Create account
    const { data, error } = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
    });

    if (error) {
        toast.error(error.message || "Registration failed!");
        return;
    }

    if (data) {
        // Step 2: Upload profile image after signup
        if (photo) {
            try {
                const formData = new FormData();
                formData.append("image", photo);

                const uploadRes = await apiFetch("/upload/image", {
                    method: "POST",
                    body: formData,
                });

                const uploadData = await uploadRes.json();

                if (!uploadRes.ok) {
                    throw new Error(
                        uploadData.message || "Image upload failed!"
                    );
                }

                // Step 3: Save image URL to user profile
                const profileRes = await apiFetch("/users/me", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        image: uploadData.imageUrl,
                    }),
                });

                if (!profileRes.ok) {
                    throw new Error("Failed to update profile image!");
                }
                await refetch();
            } catch (imageError) {
                console.error("Profile image error:", imageError);
                toast.error(
                    "Account created, but profile image upload failed!"
                );

                router.push("/");
                return;
            }
        }

        toast.success("Account created successfully!");

        setTimeout(() => {
            router.push("/");
        }, 1500);
    }
}  catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f8f6] px-4 py-8 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#35C77A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#142B45]/[0.06] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_28px_80px_rgba(20,43,69,0.12)] lg:min-h-[760px] lg:grid-cols-[0.92fr_1.08fr]">
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
              THE EQUIPMENT MARKETPLACE
            </p>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] xl:text-5xl">
              Get started with the right gear.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-slate-300">
              Create your Equiply account to find equipment for your next
              project or share your own with the community.
            </p>
          </div>

          <p className="relative text-sm text-slate-400">
            One account. More ways to get things done.
          </p>
        </aside>

        <section className="flex items-center justify-center px-5 py-8 sm:px-10 sm:py-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-7 flex justify-center lg:hidden">
              <Image
                src="/images/logoo.png"
                alt="Equiply"
                width={220}
                height={100}
                priority
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Heading */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#35C77A]">
                Join Equiply
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#142B45]">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
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
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#142B45] shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
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
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[0.68rem] font-semibold tracking-[0.12em] text-slate-400">
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
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-[#142B45] outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
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
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-[#142B45] outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
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
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-4 py-3 transition duration-200 hover:border-[#35C77A] hover:bg-emerald-50/50 focus-within:ring-4 focus-within:ring-[#35C77A]/10"
                >
                  <Camera size={19} className="shrink-0 text-[#23995A]" />

                  <span className="truncate text-sm text-slate-500">
                    {photo ? photo.name : "Choose a profile photo"}
                  </span>

                  <span className="ml-auto shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#23995A] shadow-sm">
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
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-[#142B45] outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-[#142B45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <p className="mt-1.5 text-xs leading-5 text-slate-400">
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
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-[#142B45] outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-[#142B45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
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
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#35C77A] px-5 py-3.5 text-sm font-bold text-[#142B45] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#42d98a] hover:shadow-md hover:shadow-[#35C77A]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45] disabled:cursor-not-allowed disabled:opacity-60"
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
                className="font-bold text-[#23995A] transition hover:text-[#142B45] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <p className="relative mt-6 text-center text-xs text-slate-400">
        © 2026 Equiply. All rights reserved.
      </p>
    </main>
  );
}
