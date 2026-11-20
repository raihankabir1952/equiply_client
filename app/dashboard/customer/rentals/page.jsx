
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function MyRentalsPage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { data: session, isPending } = useSession();

    // Authentication check
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "customer") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    // Fetch customer rentals
    useEffect(() => {
        if (isPending || !session || session.user.role !== "customer") {
            return;
        }

        const fetchRentals = async () => {
            try {
                const res = await apiFetch("/rentals");

                const data = await res.json();

                if (res.ok) {
                    setBookings(data.rentals || []);
                } else {
                    console.error("Failed to fetch rentals:", data.message);
                }
            } catch (error) {
                console.error("Failed to fetch rentals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, [session, isPending]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    // Filters
    const filters = [
        "All",
        "Pending",
        "Confirmed",
        "Active",
        "Completed",
        "Cancelled",
    ];

    // Format backend data for UI
    const formattedBookings = bookings.map((rental) => ({
        id: rental._id,
        equipmentName: rental.equipment?.name || "Equipment",
        category: rental.equipment?.category || "General",
        image: rental.equipment?.image,

        startDate: new Date(rental.startDate).toLocaleDateString("en-BD", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Dhaka",
        }),

        endDate: new Date(rental.endDate).toLocaleDateString("en-BD", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Dhaka",
        }),

        paidAt: rental.paidAt
            ? new Date(rental.paidAt).toLocaleString("en-BD", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Dhaka",
            })
            : null,

        duration: rental.rentalDays || 0,
        totalPrice: Number(rental.totalAmount || 0),
        status: rental.status?.toLowerCase() || "pending",
        paymentStatus: rental.paymentStatus || "unpaid",
    }));

    // Filter bookings
    const filteredBookings =
        activeFilter === "All"
            ? formattedBookings
            : formattedBookings.filter(
                (booking) => booking.status === activeFilter.toLowerCase()
            );

    // Status styles
    const getStatusStyle = (status) => {
        switch (status) {
            case "confirmed":
            case "active":
                return "bg-green-50 text-green-700";
            case "pending":
                return "bg-yellow-50 text-yellow-700";
            case "completed":
                return "bg-blue-50 text-blue-700";
            case "cancelled":
                return "bg-red-50 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    My Rentals
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Manage and track all your equipment rentals.
                </p>
            </div>

            {/* Booking Filters */}
            <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${activeFilter === filter
                                ? "bg-[#142B45] text-white"
                                : "border border-gray-200 bg-white text-gray-600 hover:border-[#35C77A] hover:text-[#35C77A]"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Booking Count */}
            <p className="text-sm text-gray-500">
                Showing {filteredBookings.length} of {formattedBookings.length} bookings
            </p>

            {/* Loading State */}
            {loading ? (
                <div className="rounded-xl border border-gray-100 bg-white py-12 text-center">
                    <p className="text-sm text-gray-500">
                        Loading your rentals...
                    </p>
                </div>
            ) : filteredBookings.length > 0 ? (
                /* Booking List */
                <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row">
                                {/* Equipment Image */}
                                {booking.image ? (
                                    <img
                                        src={booking.image}
                                        alt={booking.equipmentName}
                                        className="h-32 w-full rounded-lg object-cover sm:w-40"
                                    />
                                ) : (
                                    <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400 sm:w-40">
                                        No Image
                                    </div>
                                )}

                                {/* Booking Information */}
                                <div className="flex flex-1 flex-col justify-between gap-4">
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#142B45]">
                                                {booking.equipmentName}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {booking.category}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                                                booking.status
                                            )}`}
                                        >
                                            {booking.status.charAt(0).toUpperCase() +
                                                booking.status.slice(1)}
                                        </span>
                                    </div>

                                    {/* Rental Dates */}
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Start Date
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-gray-700">
                                                {booking.startDate}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                End Date
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-gray-700">
                                                {booking.endDate}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Duration
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-gray-700">
                                                {booking.duration} Days
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price and Details */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Total Amount
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-[#142B45]">
                                                ৳{booking.totalPrice.toLocaleString("en-BD")}
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Payment: {booking.paymentStatus}
                                            </p>

                                            {booking.paidAt && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Payment Date & Time:{" "}
                                                    <span className="font-medium text-gray-700">
                                                        {booking.paidAt}
                                                    </span>
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/dashboard/customer/rentals/${booking.id}`
                                                )
                                            }
                                            className="rounded-lg border border-[#142B45] px-4 py-2 text-sm font-medium text-[#142B45] transition hover:bg-[#142B45] hover:text-white"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
                    <h3 className="text-lg font-semibold text-[#142B45]">
                        No Rentals Found
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        You don't have any {activeFilter.toLowerCase()} rentals yet.
                    </p>

                    <button
                        onClick={() => router.push("/equipment")}
                        className="mt-4 rounded-lg bg-[#35C77A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
                    >
                        Explore Equipment
                    </button>
                </div>
            )}
        </div>
    );
}
