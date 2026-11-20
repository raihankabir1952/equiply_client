
"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function CustomerProfilePage() {
    const router = useRouter();
    const { data: session, isPending, refetch } = useSession();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [removing, setRemoving] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "customer") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setPhoneNumber(session.user.phoneNumber || "");
            setAddress(session.user.address || "");
        }
    }, [session]);

    const handleUpdateProfile = async () => {
        if (!name.trim()) {
            toast.error("Name cannot be empty!");
            return;
        }

        try {
            setSaving(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: name.trim(),
                        phoneNumber: phoneNumber.trim(),
                        address: address.trim(),
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                await refetch();
                toast.success("Profile updated successfully!");
            } else {
                toast.error(data.message || "Failed to update profile!");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Something went wrong!");
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (file) => {
        if (!file) return;

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
                {
                    method: "POST",
                    credentials: "include",
                    body: formData,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Image upload failed!");
                return;
            }

            const updateRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        image: data.imageUrl,
                    }),
                }
            );

            const updateData = await updateRes.json();

            if (updateRes.ok) {
                await refetch();
                toast.success("Profile photo updated successfully!");
            } else {
                toast.error(
                    updateData.message || "Failed to update profile photo!"
                );
            }
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Something went wrong!");
        } finally {
            setUploading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemovePhoto = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to remove your profile photo?"
        );

        if (!confirmed) return;

        try {
            setRemoving(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        image: null,
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                await refetch();
                toast.success("Profile photo removed successfully!");
            } else {
                toast.error(
                    data.message || "Failed to remove profile photo!"
                );
            }
        } catch (error) {
            console.error("Remove photo error:", error);
            toast.error("Something went wrong!");
        } finally {
            setRemoving(false);
        }
    };

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
                    Update your profile photo and personal information.
                </p>

                {/* Profile Photo */}
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <img
                        src={
                            session.user.image ||
                            "/images/default-avatar.png"
                        }
                        alt="Profile"
                        className="h-24 w-24 rounded-full border-4 border-gray-100 object-cover"
                    />

                    <div>
                        <h3 className="font-semibold text-[#142B45]">
                            Profile Photo
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Upload or remove your profile picture.
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                disabled={uploading || removing}
                                className="rounded-lg border border-[#35C77A] px-4 py-2 text-sm font-semibold text-[#35C77A] transition hover:bg-green-50 disabled:opacity-60"
                            >
                                {uploading ? "Uploading..." : "Change Photo"}
                            </button>

                            {session.user.image && (
                                <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    disabled={removing || uploading}
                                    className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60"
                                >
                                    <Trash2 size={16} />
                                    {removing ? "Removing..." : "Remove Photo"}
                                </button>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            hidden
                            onChange={(e) =>
                                handleImageUpload(e.target.files[0])
                            }
                        />
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#35C77A]"
                    />
                </div>

                {/* Phone Number */}
                <div className="mt-6 max-w-xl">
                    <label className="mb-2 block text-sm font-medium text-[#142B45]">
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#35C77A]"
                    />
                </div>

                {/* Address */}
                <div className="mt-6 max-w-xl">
                    <label className="mb-2 block text-sm font-medium text-[#142B45]">
                        Address
                    </label>

                    <textarea
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#35C77A]"
                    />
                </div>

                {/* Save Changes */}
                <button
                    type="button"
                    disabled={saving}
                    onClick={handleUpdateProfile}
                    className="mt-6 rounded-lg bg-[#142B45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3d5e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}
