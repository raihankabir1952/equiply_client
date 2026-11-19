
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, Plus, X, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function MyEquipmentPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [newImage, setNewImage] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        rentalType: "daily",
        location: "",
        availableQuantity: "",
        termsAndConditions: "",
    });

    // Authentication Check
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "owner") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    // Fetch Owner Equipment
    const fetchEquipment = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/equipment/my-equipment`,
                {
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (res.ok) {
                setEquipment(data.equipment || []);
            } else {
                toast.error(data.message || "Failed to load equipment.");
            }
        } catch (error) {
            console.error("Equipment fetch error:", error);
            toast.error("Failed to fetch equipment.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending && session?.user?.role === "owner") {
            fetchEquipment();
        }
    }, [session, isPending]);

    // Open Edit Modal
    const handleEdit = (item) => {
        setSelectedEquipment(item);

        setFormData({
            name: item.name || "",
            description: item.description || "",
            price: item.price ?? "",
            category: item.category || "",
            rentalType: item.rentalType || "daily",
            location: item.location || "",
            availableQuantity: item.availableQuantity ?? "",
            termsAndConditions: item.termsAndConditions || "",
        });

        setNewImage(null);
    };

    // Handle Form Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Update Equipment
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!selectedEquipment) return;

        setUpdating(true);

        try {
            let imageUrl = selectedEquipment.image;

            // Upload New Image if Selected
            if (newImage) {
                const imageData = new FormData();
                imageData.append("image", newImage);

                const uploadRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
                    {
                        method: "POST",
                        credentials: "include",
                        body: imageData,
                    }
                );

                const uploadResult = await uploadRes.json();

                if (!uploadRes.ok) {
                    throw new Error(
                        uploadResult.message || "Image upload failed!"
                    );
                }

                imageUrl = uploadResult.imageUrl;
            }

            // Update Equipment API
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/equipment/${selectedEquipment._id}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        image: imageUrl,
                        price: Number(formData.price),
                        availableQuantity: Number(
                            formData.availableQuantity
                        ),
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Equipment update failed!");
            }

            toast.success("Equipment updated successfully!");

            setSelectedEquipment(null);
            setNewImage(null);

            await fetchEquipment();
        } catch (error) {
            console.error("Update equipment error:", error);
            toast.error(error.message || "Failed to update equipment.");
        } finally {
            setUpdating(false);
        }
    };

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#142B45]">
                        My Equipment
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Manage all your listed equipment in one place.
                    </p>
                </div>

                <Link
                    href="/dashboard/owner/add-equipment"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#35C77A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2db36b]"
                >
                    <Plus size={18} />
                    Add Equipment
                </Link>
            </div>

            {/* Equipment Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">

                        <thead className="bg-gray-50">
                            <tr className="text-sm text-gray-600">
                                <th className="px-6 py-4 font-semibold">
                                    Equipment Name
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Category
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Rental Price
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Available Quantity
                                </th>

                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                                        Loading equipment...
                                    </td>
                                </tr>
                            ) : equipment.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500">
                                        No equipment found. Add your first equipment!
                                    </td>
                                </tr>
                            ) : (
                                equipment.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="text-sm transition hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 font-semibold text-[#142B45]">
                                            {item.name}
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {item.category}
                                        </td>

                                        <td className="px-6 py-4 font-medium text-[#142B45]">
                                            ৳{item.price?.toLocaleString("en-BD")}
                                            <span className="ml-1 text-xs text-gray-400">
                                                / day
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {item.availableQuantity}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    item.status === "approved"
                                                        ? "bg-green-50 text-green-700"
                                                        : item.status === "pending"
                                                            ? "bg-yellow-50 text-yellow-700"
                                                            : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {item.status?.charAt(0).toUpperCase() +
                                                    item.status?.slice(1)}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">

                                                <button
                                                    type="button"
                                                    title="View Details"
                                                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    <Eye size={17} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Update"
                                                    onClick={() => handleEdit(item)}
                                                    className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Delete"
                                                    className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-4">
                    <p className="text-sm text-gray-500">
                        Showing {loading ? "..." : equipment.length} equipment items
                    </p>
                </div>
            </div>

            {/* Edit Equipment Modal */}
            {selectedEquipment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
                            <div>
                                <h2 className="text-xl font-bold text-[#142B45]">
                                    Edit Equipment
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update your equipment information.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedEquipment(null)}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleUpdate} className="space-y-5 p-6">

                            {/* Equipment Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                    Equipment Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                />
                            </div>

                            {/* Category and Location */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                />
                            </div>

                            {/* Price, Rental Type, Quantity */}
                            <div className="grid gap-5 sm:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                        Price (৳)
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                        Rental Type
                                    </label>

                                    <select
                                        name="rentalType"
                                        value={formData.rentalType}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                        Available Quantity
                                    </label>

                                    <input
                                        type="number"
                                        name="availableQuantity"
                                        value={formData.availableQuantity}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                    />
                                </div>
                            </div>

                            {/* Current Image */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                    Equipment Image
                                </label>

                                {selectedEquipment.image && (
                                    <img
                                        src={selectedEquipment.image}
                                        alt={selectedEquipment.name}
                                        className="mb-3 h-36 w-48 rounded-lg border object-cover"
                                    />
                                )}

                                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-5 text-sm text-gray-600 transition hover:border-[#35C77A]">
                                    <Upload size={18} />
                                    {newImage ? newImage.name : "Choose a new image (optional)"}

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={(e) =>
                                            setNewImage(e.target.files?.[0] || null)
                                        }
                                    />
                                </label>

                                <p className="mt-2 text-xs text-gray-400">
                                    Leave empty to keep the current image.
                                </p>
                            </div>

                            {/* Terms and Conditions */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                    Terms and Conditions
                                </label>

                                <textarea
                                    name="termsAndConditions"
                                    value={formData.termsAndConditions}
                                    onChange={handleChange}
                                    rows="3"
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() => setSelectedEquipment(null)}
                                    disabled={updating}
                                    className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="rounded-lg bg-[#35C77A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2db36b] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {updating ? "Updating..." : "Save Changes"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
