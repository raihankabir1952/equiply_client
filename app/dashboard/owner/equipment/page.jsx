
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export default function MyEquipmentPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);

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
    useEffect(() => {
        if (!isPending && session?.user?.role === "owner") {
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
                        console.error(data.message);
                    }
                } catch (error) {
                    console.error("Equipment fetch error:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchEquipment();
        }
    }, [session, isPending]);

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
                                    <td
                                        colSpan="6"
                                        className="px-6 py-10 text-center text-sm text-gray-500"
                                    >
                                        Loading equipment...
                                    </td>
                                </tr>
                            ) : equipment.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-10 text-center text-sm text-gray-500"
                                    >
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

                                                {/* View Details */}
                                                <button
                                                    type="button"
                                                    title="View Details"
                                                    className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    <Eye size={17} />
                                                </button>

                                                {/* Update */}
                                                <button
                                                    type="button"
                                                    title="Update"
                                                    className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                                                >
                                                    <Pencil size={17} />
                                                </button>

                                                {/* Delete */}
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

        </div>
    );
}
