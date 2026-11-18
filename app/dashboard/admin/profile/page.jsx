
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Camera, UserRound, Mail, Save, ShieldCheck } from "lucide-react";

export default function AdminProfilePage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [name, setName] = useState("");
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/");
        }

        if (session) {
            setName(session.user.name || "");
            setPreview(session.user.image || "");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Profile update functionality will be added later.
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    My Profile
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Manage your administrator account information.
                </p>
            </div>

            {/* Profile Card */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

                {/* Profile Image */}
                <div className="flex flex-col items-center border-b border-gray-100 pb-8">
                    <div className="relative">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Admin Profile"
                                className="h-28 w-28 rounded-full border-4 border-green-50 object-cover"
                            />
                        ) : (
                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#142B45] text-3xl font-bold text-white">
                                {session.user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <label
                            htmlFor="admin-profile-photo"
                            className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#35C77A] text-white transition hover:bg-[#2db36b]"
                        >
                            <Camera size={17} />
                        </label>

                        <input
                            id="admin-profile-photo"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-[#142B45]">
                        {session.user.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Equiply Administrator
                    </p>

                    <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                        <ShieldCheck size={14} />
                        Admin Account
                    </p>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                    {/* Full Name */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#142B45]">
                            <UserRound size={17} />
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#35C77A]"
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#142B45]">
                            <Mail size={17} />
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={session.user.email || ""}
                            readOnly
                            className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
                        />

                        <p className="mt-2 text-xs text-gray-400">
                            Email address cannot be changed.
                        </p>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end border-t border-gray-100 pt-6">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#35C77A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2db36b]"
                        >
                            <Save size={17} />
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}
