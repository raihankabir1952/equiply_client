"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { CalendarDays, ClipboardList } from "lucide-react";
import { toast } from "sonner";

export default function OwnerRentalsPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingRentalId, setUpdatingRentalId] = useState(null);

    // Fetch Owner Rentals
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
            return;
        }

        if (!isPending && session && session.user.role !== "owner") {
            router.replace("/");
            return;
        }

        if (!isPending && session?.user.role === "owner") {
            const fetchRentals = async () => {
                try {
                    const res = await apiFetch("/rentals/owner-rentals");

                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(
                            data.message || "Failed to fetch rentals!"
                        );
                    }

                    setRentals(data.rentals || []);
                } catch (error) {
                    console.error("Fetch owner rentals error:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRentals();
        }
    }, [session, isPending, router]);

    // Update Rental Status
    const handleStatusChange = async (id, status) => {
        setUpdatingRentalId(id);

        try {
            const res = await apiFetch(`/rentals/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to update rental status!"
                );
            }

            setRentals((previousRentals) =>
                previousRentals.map((rental) =>
                    rental._id === id
                        ? { ...rental, status }
                        : rental
                )
            );

            toast.success("Rental status updated successfully!");
        } catch (error) {
            console.error("Update rental status error:", error);
            toast.error(error.message || "Failed to update rental status!");
        } finally {
            setUpdatingRentalId(null);
        }
    };

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    const activeRentals = rentals.filter(
        (rental) =>
            rental.status === "confirmed" ||
            rental.status === "active"
    );

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatDuration = (startDate, endDate) => {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-blue-50 text-blue-700";
            case "active":
                return "bg-purple-50 text-purple-700";
            case "completed":
                return "bg-green-50 text-green-700";
            case "cancelled":
                return "bg-red-50 text-red-700";
            default:
                return "bg-yellow-50 text-yellow-700";
        }
    };

    const getPaymentStyle = (status) => {
        return status === "paid"
            ? "bg-green-50 text-green-700"
            : "bg-yellow-50 text-yellow-700";
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    My Equipment Rental
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Track all rental bookings made for your equipment.
                </p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-50 p-3">
                            <ClipboardList className="text-[#35C77A]" size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Rentals
                            </p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {loading ? "..." : rentals.length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <CalendarDays className="text-blue-600" size={22} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Active Rentals
                            </p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {loading ? "..." : activeRentals.length}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Rental Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1150px] text-left">

                        <thead className="bg-gray-50">
                            <tr className="text-sm text-gray-600">
                                <th className="px-5 py-4 font-semibold">
                                    Customer Information
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Equipment Information
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Rental Duration
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Required Quantity
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Booking Amount
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Payment Status
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Booking Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-5 py-10 text-center text-gray-500"
                                    >
                                        Loading rentals...
                                    </td>
                                </tr>
                            ) : rentals.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-5 py-10 text-center text-gray-500"
                                    >
                                        No rental records found.
                                    </td>
                                </tr>
                            ) : (
                                rentals.map((rental) => (
                                    <tr
                                        key={rental._id}
                                        className="text-sm transition hover:bg-gray-50"
                                    >

                                        {/* Customer Information */}
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-[#142B45]">
                                                {rental.customer?.name || "N/A"}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {rental.customer?.email || "N/A"}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                ID: {rental.customerId}
                                            </p>
                                            <p className="mt-2 text-xs text-gray-500">
                                                Booked:{" "}
                                                {rental.createdAt
                                                    ? new Date(rental.createdAt).toLocaleString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })
                                                    : "N/A"}
                                            </p>
                                        </td>

                                        {/* Equipment Information */}
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-[#142B45]">
                                                {rental.equipment?.name || "N/A"}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {rental.equipment?.category || ""}
                                            </p>
                                        </td>

                                        {/* Rental Duration */}
                                        <td className="px-5 py-4 whitespace-nowrap text-gray-600">
                                            {formatDuration(
                                                rental.startDate,
                                                rental.endDate
                                            )}
                                        </td>

                                        {/* Required Quantity */}
                                        <td className="px-5 py-4 text-gray-600">
                                            {rental.quantity}
                                        </td>

                                        {/* Booking Amount */}
                                        <td className="px-5 py-4 font-semibold text-[#142B45]">
                                            ৳{Number(
                                                rental.totalAmount || 0
                                            ).toLocaleString()}
                                        </td>

                                        {/* Payment Status */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStyle(
                                                    rental.paymentStatus
                                                )}`}
                                            >
                                                {rental.paymentStatus || "pending"}
                                            </span>
                                        </td>

                                        {/* Booking Status */}
                                        <td className="px-5 py-4">
                                            <select
                                                value={rental.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        rental._id,
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    updatingRentalId === rental._id
                                                }
                                                className={`rounded-full border-0 px-3 py-2 text-xs font-semibold capitalize outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${getStatusStyle(
                                                    rental.status
                                                )}`}
                                            >
                                                {rental.status === "pending" && (
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                )}

                                                <option value="confirmed">
                                                    Confirmed
                                                </option>
                                                <option value="active">
                                                    Active
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
                                                <option value="cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-5 py-4">
                    <p className="text-sm text-gray-500">
                        Showing {loading ? "..." : rentals.length} rental records
                    </p>
                </div>
            </div>

        </div>
    );
}
