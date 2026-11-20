
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ClipboardList, CalendarDays, Wallet } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AllRentalsPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (!session || session.user.role !== "admin") return;

        const fetchRentals = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/rentals/admin`, {
                    credentials: "include",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch rentals!");
                }

                setRentals(data.rentals || []);
            } catch (error) {
                console.error("Fetch rentals error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, [session]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    const activeRentals = rentals.filter(
        (rental) => ["confirmed", "active"].includes(rental.status)
    ).length;

    const totalAmount = rentals.reduce(
        (total, rental) => total + Number(rental.totalAmount || 0),
        0
    );

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Dhaka",
        });
    };

    const formatDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return "N/A";

        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

    const getBookingStatusStyle = (status) => {
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

    const getPaymentStatusStyle = (status) => {
        return status === "paid"
            ? "bg-green-50 text-green-700"
            : "bg-yellow-50 text-yellow-700";
    };

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-500">
                Loading rental records...
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    All Rentals
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Monitor and manage all equipment rental activities.
                </p>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <ClipboardList className="text-blue-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Rentals</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {rentals.length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-50 p-3">
                            <CalendarDays className="text-[#35C77A]" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Rentals</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {activeRentals}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-3">
                            <Wallet className="text-purple-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Booking Amount</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                ৳{totalAmount.toLocaleString("en-BD")}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Rentals Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">
                    <h2 className="font-semibold text-[#142B45]">
                        All Rental Records
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        View customer, owner and booking information.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1250px] text-left">

                        <thead className="bg-gray-50">
                            <tr className="text-sm text-gray-600">
                                <th className="px-5 py-4 font-semibold">
                                    Customer Information
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Owner Information
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Equipment Name
                                </th>
                                <th className="px-5 py-4 font-semibold">
                                    Rental Duration
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

                            {rentals.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-5 py-12 text-center text-gray-500"
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
                                                {rental.customer?.name || "Unknown Customer"}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {rental.customer?.email || "N/A"}
                                            </p>
                                        </td>

                                        {/* Owner Information */}
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-[#142B45]">
                                                {rental.owner?.name || "Unknown Owner"}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {rental.owner?.email || "N/A"}
                                            </p>
                                        </td>

                                        {/* Equipment */}
                                        <td className="px-5 py-4 font-medium text-[#142B45]">
                                            {rental.equipment?.name || "Equipment unavailable"}
                                        </td>

                                        {/* Rental Duration */}
                                        <td className="px-5 py-4 whitespace-nowrap text-gray-600">
                                            {formatDuration(
                                                rental.startDate,
                                                rental.endDate
                                            )}
                                        </td>

                                        {/* Booking Amount */}
                                        <td className="px-5 py-4 font-semibold text-[#142B45]">
                                            ৳{Number(rental.totalAmount || 0).toLocaleString("en-BD")}
                                        </td>

                                        {/* Payment Status */}
                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPaymentStatusStyle(rental.paymentStatus)}`}>
                                                {rental.paymentStatus || "unpaid"}
                                            </span>
                                        </td>

                                        {/* Booking Status */}
                                        <td className="px-5 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getBookingStatusStyle(rental.status)}`}>
                                                {rental.status || "pending"}
                                            </span>
                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>
                </div>

                <div className="border-t border-gray-100 px-5 py-4">
                    <p className="text-sm text-gray-500">
                        Showing {rentals.length} rental records
                    </p>
                </div>

            </div>

        </div>
    );
}
