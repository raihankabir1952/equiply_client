
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import {
    Camera,
    UserRound,
    Mail,
    Save,
    ShieldCheck,
    Phone,
    MapPin,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminProfilePage() {
    const router = useRouter();
    const { data: session, isPending, refetch } = useSession();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [preview, setPreview] = useState("");

    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/");
        }

        if (session) {
            setName(session.user.name || "");
            setPhoneNumber(session.user.phoneNumber || "");
            setAddress(session.user.address || "");
            setPreview(session.user.image || "");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    // Profile Image Upload
    const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image!");
        return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
        setUploading(true);

        const formData = new FormData();
        formData.append("image", file);

        // Upload image to ImgBB
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

        // Update profile image
        const updateRes = await apiFetch("/users/me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image: uploadData.imageUrl,
            }),
        });

        const updateData = await updateRes.json();

        if (!updateRes.ok) {
            throw new Error(
                updateData.message || "Profile image update failed!"
            );
        }

        await refetch();

        setPreview(uploadData.imageUrl);
        toast.success("Profile photo updated successfully!");
    } catch (error) {
        setPreview(session.user.image || "");
        toast.error(error.message || "Image upload failed!");
    } finally {
        URL.revokeObjectURL(localPreview);
        setUploading(false);
        e.target.value = "";
    }
};

    // Remove Profile Image
    const handleRemovePhoto = async () => {
    const confirmed = window.confirm(
        "Are you sure you want to remove your profile photo?"
    );

    if (!confirmed) return;

    try {
        setUploading(true);

        const res = await apiFetch("/users/me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image: null,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.message || "Failed to remove profile photo!"
            );
        }

        await refetch();

        setPreview("");
        toast.success("Profile photo removed successfully!");
    } catch (error) {
        toast.error(error.message || "Something went wrong!");
    } finally {
        setUploading(false);
    }
};

    // Update Profile Information
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
        toast.error("Name cannot be empty!");
        return;
    }

    try {
        setSaving(true);

        const res = await apiFetch("/users/me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name.trim(),
                phoneNumber: phoneNumber.trim(),
                address: address.trim(),
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(
                data.message || "Profile update failed!"
            );
        }

        await refetch();

        toast.success("Profile updated successfully!");
    } catch (error) {
        toast.error(error.message || "Something went wrong!");
    } finally {
        setSaving(false);
    }
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
                            className={`absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#35C77A] text-white transition hover:bg-[#2db36b] ${
                                uploading
                                    ? "cursor-not-allowed opacity-50"
                                    : "cursor-pointer"
                            }`}
                        >
                            <Camera size={17} />
                        </label>

                        <input
                            id="admin-profile-photo"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handlePhotoChange}
                            disabled={uploading}
                            className="hidden"
                        />
                    </div>

                    {/* Remove Photo Button */}
                    {preview && (
                        <button
                            type="button"
                            onClick={handleRemovePhoto}
                            disabled={uploading}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-red-500 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2 size={14} />
                            Remove Photo
                        </button>
                    )}

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

                    {uploading && (
                        <p className="mt-3 text-xs text-gray-500">
                            Please wait...
                        </p>
                    )}
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

                    {/* Phone Number */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#142B45]">
                            <Phone size={17} />
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
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#142B45]">
                            <MapPin size={17} />
                            Address
                        </label>

                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                            rows={3}
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
                            disabled={saving || uploading}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#35C77A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2db36b] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Save size={17} />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
