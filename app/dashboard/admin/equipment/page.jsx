
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
    Check,
    X,
    Pencil,
    Trash2,
    Package,
    Upload,
    Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function AllEquipmentPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const [editingEquipment, setEditingEquipment] = useState(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        rentalType: "daily",
        location: "",
        availableQuantity: "",
        termsAndConditions: "",
    });

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    // Fetch all equipment
    useEffect(() => {
        if (!session || session.user.role !== "admin") return;

        const fetchEquipments = async () => {
            try {
                const [equipmentRes, usersRes] = await Promise.all([
                    fetch(`${API_URL}/equipment`, {
                        credentials: "include",
                    }),
                    fetch(`${API_URL}/users`, {
                        credentials: "include",
                    }),
                ]);

                const equipmentData = await equipmentRes.json();
                const usersData = await usersRes.json();

                if (!equipmentRes.ok || !usersRes.ok) {
                    throw new Error("Failed to fetch equipment!");
                }

                const equipmentList = (equipmentData.equipments || []).map(
                    (equipment) => {
                        const owner = (usersData.users || []).find(
                            (user) =>
                                String(user._id || user.id) ===
                                String(equipment.ownerId)
                        );

                        return {
                            ...equipment,
                            ownerName: owner?.name || "Unknown Owner",
                        };
                    }
                );

                setEquipments(equipmentList);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load equipment!");
            } finally {
                setLoading(false);
            }
        };

        fetchEquipments();
    }, [session, API_URL]);

    // Update equipment status
    const updateStatus = async (id, status) => {
        try {
            setProcessingId(id);

            const response = await fetch(
                `${API_URL}/equipment/${id}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Status update failed!");
            }

            setEquipments((previous) =>
                previous.map((item) =>
                    item._id === id ? { ...item, status } : item
                )
            );

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setProcessingId(null);
        }
    };

    // Delete equipment
    const deleteEquipment = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this equipment?"
        );

        if (!confirmed) return;

        try {
            setProcessingId(id);

            const response = await fetch(
                `${API_URL}/equipment/${id}/admin`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Delete failed!");
            }

            setEquipments((previous) =>
                previous.filter((item) => item._id !== id)
            );

            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setProcessingId(null);
        }
    };

    // Open edit modal
    const openEditModal = (item) => {
        setEditingEquipment(item);

        setFormData({
            name: item.name || "",
            description: item.description || "",
            price: item.price ?? "",
            category: item.category || "",
            image: item.image || "",
            rentalType: item.rentalType || "daily",
            location: item.location || "",
            availableQuantity: item.availableQuantity ?? "",
            termsAndConditions: item.termsAndConditions || "",
        });
    };

    // Close edit modal
    const closeEditModal = () => {
        setEditingEquipment(null);
    };

    // Handle form input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // Upload image
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file!");
            return;
        }

        try {
            setUploading(true);

            const uploadData = new FormData();
            uploadData.append("image", file);

            const response = await fetch(`${API_URL}/upload/image`, {
                method: "POST",
                credentials: "include",
                body: uploadData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Image upload failed!");
            }

            setFormData((previous) => ({
                ...previous,
                image: data.imageUrl,
            }));

            toast.success("Image uploaded successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    // Save edited equipment
    const handleUpdateEquipment = async (e) => {
        e.preventDefault();

        if (!editingEquipment) return;

        try {
            setSaving(true);

            const response = await fetch(
                `${API_URL}/equipment/${editingEquipment._id}/admin`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
                        price: Number(formData.price),
                        availableQuantity: Number(
                            formData.availableQuantity
                        ),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Equipment update failed!");
            }

            setEquipments((previous) =>
                previous.map((item) =>
                    item._id === editingEquipment._id
                        ? {
                              ...item,
                              ...formData,
                              price: Number(formData.price),
                              availableQuantity: Number(
                                  formData.availableQuantity
                              ),
                          }
                        : item
                )
            );

            toast.success(data.message);
            closeEditModal();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    const pendingCount = equipments.filter(
        (item) => item.status === "pending"
    ).length;

    const approvedCount = equipments.filter(
        (item) => item.status === "approved"
    ).length;

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    All Equipment
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Review and manage all equipment listed by owners.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <Package className="text-blue-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Equipment</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {equipments.length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-yellow-50 p-3">
                            <Package className="text-yellow-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {pendingCount}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-50 p-3">
                            <Check className="text-[#35C77A]" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Approved</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {approvedCount}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Equipment Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">
                    <h2 className="font-semibold text-[#142B45]">
                        Equipment Listings
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Approve, reject or manage equipment listings.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px] text-left">

                        <thead className="bg-gray-50">
                            <tr className="text-sm text-gray-600">
                                <th className="px-5 py-4 font-semibold">Equipment</th>
                                <th className="px-5 py-4 font-semibold">Owner</th>
                                <th className="px-5 py-4 font-semibold">Rental Price</th>
                                <th className="px-5 py-4 font-semibold">Quantity</th>
                                <th className="px-5 py-4 font-semibold">Status</th>
                                <th className="px-5 py-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-5 py-10 text-center text-gray-500">
                                        Loading equipment...
                                    </td>
                                </tr>
                            ) : equipments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-5 py-10 text-center text-gray-500">
                                        No equipment found.
                                    </td>
                                </tr>
                            ) : (
                                equipments.map((item) => (
                                    <tr key={item._id} className="text-sm transition hover:bg-gray-50">

                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-[#142B45]">
                                                {item.name}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {item.category}
                                            </p>
                                        </td>

                                        <td className="px-5 py-4 font-medium text-gray-600">
                                            {item.ownerName}
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-[#142B45]">
                                            ৳{Number(item.price).toLocaleString()}
                                            <span className="ml-1 text-xs font-normal text-gray-400">
                                                / {item.rentalType}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-gray-600">
                                            {item.availableQuantity}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    item.status === "approved"
                                                        ? "bg-green-50 text-green-700"
                                                        : item.status === "rejected"
                                                        ? "bg-red-50 text-red-600"
                                                        : "bg-yellow-50 text-yellow-700"
                                                }`}
                                            >
                                                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-2">

                                                {item.status === "pending" && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            title="Approve"
                                                            disabled={processingId === item._id}
                                                            onClick={() => updateStatus(item._id, "approved")}
                                                            className="rounded-lg bg-green-50 p-2 text-green-600 transition hover:bg-green-100 disabled:opacity-50"
                                                        >
                                                            <Check size={17} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            title="Reject"
                                                            disabled={processingId === item._id}
                                                            onClick={() => updateStatus(item._id, "rejected")}
                                                            className="rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100 disabled:opacity-50"
                                                        >
                                                            <X size={17} />
                                                        </button>
                                                    </>
                                                )}

                                                {/* Edit Button */}
                                                <button
                                                    type="button"
                                                    title="Edit Equipment"
                                                    onClick={() => openEditModal(item)}
                                                    className="rounded-lg bg-blue-600 p-2 text-white shadow-sm transition hover:bg-blue-700"
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    type="button"
                                                    title="Delete"
                                                    disabled={processingId === item._id}
                                                    onClick={() => deleteEquipment(item._id)}
                                                    className="rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100 disabled:opacity-50"
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

                <div className="border-t border-gray-100 px-5 py-4">
                    <p className="text-sm text-gray-500">
                        Showing {equipments.length} equipment listings
                    </p>
                </div>

            </div>

            {/* Edit Equipment Modal */}
            {editingEquipment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
                            <div>
                                <h2 className="text-xl font-bold text-[#142B45]">
                                    Edit Equipment
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Update equipment information.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeEditModal}
                                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateEquipment} className="space-y-5 p-6">

                            {/* Equipment Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Equipment Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Price and Quantity */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Rental Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Available Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="availableQuantity"
                                        value={formData.availableQuantity}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                            </div>

                            {/* Category and Rental Type */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Rental Type
                                    </label>
                                    <select
                                        name="rentalType"
                                        value={formData.rentalType}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="hourly">Hourly</option>
                                        <option value="weekly">Weekly</option>
                                    </select>
                                </div>

                            </div>

                            {/* Location */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Equipment Image
                                </label>

                                {formData.image && (
                                    <img
                                        src={formData.image}
                                        alt="Equipment preview"
                                        className="mb-3 h-40 w-full rounded-lg border border-gray-200 object-cover"
                                    />
                                )}

                                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-4 text-sm font-medium text-gray-600 transition hover:border-blue-500 hover:bg-blue-50">
                                    {uploading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={18} />
                                            Change Equipment Image
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Terms and Conditions */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Terms and Conditions
                                </label>
                                <textarea
                                    name="termsAndConditions"
                                    value={formData.termsAndConditions}
                                    onChange={handleChange}
                                    rows={3}
                                    required
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    disabled={saving}
                                    className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving || uploading}
                                    className="flex items-center justify-center gap-2 rounded-lg bg-[#142B45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3c5c] disabled:opacity-50"
                                >
                                    {saving && (
                                        <Loader2 size={17} className="animate-spin" />
                                    )}
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}
