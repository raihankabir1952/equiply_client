
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchX, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-white px-5 py-16">
            <div className="mx-auto max-w-xl text-center">

                {/* Icon */}
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
                    <SearchX size={48} className="text-[#35C77A]" />
                </div>

                {/* 404 */}
                <h1 className="text-8xl font-extrabold tracking-tight text-[#142B45] md:text-9xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold text-[#142B45] md:text-3xl">
                    Page Not Found!
                </h2>

                <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
                    Sorry, the page you are looking for doesn't exist,
                    has been moved, or is temporarily unavailable.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#35C77A] px-6 py-3 font-semibold text-[#142B45] transition hover:bg-[#28b96c]"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-6 py-3 font-semibold text-[#142B45] transition hover:bg-slate-50"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                <p className="mt-10 text-sm text-slate-400">
                    Equiply · Rent Smart. Do More.
                </p>
            </div>
        </main>
    );
}
