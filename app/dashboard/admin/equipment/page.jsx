
"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Check, X, Pencil, Trash2, Package } from "lucide-react";

const equipmentData = [
    {
        id: 1,
        name: "Heavy Duty Excavator",
        category: "Construction",
        owner: "Nusrat Jahan",
        price: 8500,
        type: "Daily",
        quantity: 2,
        status: "Pending",
    },
    {
        id: 2,
        name: "Professional DSLR Camera",
        category: "Photography",
        owner: "Tanvir Ahmed",
        price: 2500,
        type: "Daily",
        quantity: 3,
        status: "Approved",
    },
    {
        id: 3,
        name: "Industrial Power Generator",
        category: "Electronics",
        owner: "Arif Hossain",
        price: 1800,
        type: "Daily",
        quantity: 1,
        status: "Rejected",
    },
];

export default function AllEquipmentPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

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
                                {equipmentData.length}
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
                                {equipmentData.filter((item) => item.status === "Pending").length}
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
                                {equipmentData.filter((item) => item.status === "Approved").length}
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
                            {equipmentData.map((item) => (
                                <tr key={item.id} className="text-sm transition hover:bg-gray-50">

                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-[#142B45]">
                                            {item.name}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {item.category}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 font-medium text-gray-600">
                                        {item.owner}
                                    </td>

                                    <td className="px-5 py-4 font-semibold text-[#142B45]">
                                        ৳{item.price.toLocaleString()}
                                        <span className="ml-1 text-xs font-normal text-gray-400">
                                            / {item.type}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {item.quantity}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            item.status === "Approved"
                                                ? "bg-green-50 text-green-700"
                                                : item.status === "Rejected"
                                                ? "bg-red-50 text-red-600"
                                                : "bg-yellow-50 text-yellow-700"
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-center gap-2">

                                            {item.status === "Pending" && (
                                                <>
                                                    <button
                                                        type="button"
                                                        title="Approve"
                                                        className="rounded-lg bg-green-50 p-2 text-green-600 transition hover:bg-green-100"
                                                    >
                                                        <Check size={17} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        title="Reject"
                                                        className="rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
                                                    >
                                                        <X size={17} />
                                                    </button>
                                                </>
                                            )}

                                            <button
                                                type="button"
                                                title="Update"
                                                className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Delete"
                                                className="rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
                                            >
                                                <Trash2 size={17} />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className="border-t border-gray-100 px-5 py-4">
                    <p className="text-sm text-gray-500">
                        Showing {equipmentData.length} equipment listings
                    </p>
                </div>

            </div>

        </div>
    );
}
