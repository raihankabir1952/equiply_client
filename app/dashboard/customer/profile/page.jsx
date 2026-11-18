
"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function CustomerProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "customer") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    My Profile
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage your profile photo and personal information.
                </p>
            </div>

            {/* Profile Information */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#142B45]">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Update your profile photo and display name.
                </p>

                {/* Profile Photo */}
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <img
                        src={session.user.image || "/images/default-avatar.png"}
                        alt="Profile"
                        className="h-24 w-24 rounded-full border-4 border-gray-100 object-cover"
                    />

                    <div>
                        <h3 className="font-semibold text-[#142B45]">
                            Profile Photo
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Upload a new profile picture.
                        </p>

                        <button
                            type="button"
                            className="mt-3 rounded-lg border border-[#35C77A] px-4 py-2 text-sm font-semibold text-[#35C77A] transition hover:bg-green-50"
                        >
                            Change Photo
                        </button>
                    </div>
                </div>

                {/* Email Address */}
                <div className="mt-8 max-w-xl">
                    <label className="mb-2 block text-sm font-medium text-[#142B45]">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={session.user.email || ""}
                        readOnly
                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                        Your email address cannot be changed.
                    </p>
                </div>


                {/* Full Name */}
                <div className="mt-8 max-w-xl">
                    <label className="mb-2 block text-sm font-medium text-[#142B45]">
                        Full Name
                    </label>

                    <input
                        type="text"
                        defaultValue={session.user.name}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#35C77A]"
                    />

                    <button
                        type="button"
                        className="mt-5 rounded-lg bg-[#142B45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3d5e]"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );

}
