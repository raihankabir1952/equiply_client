
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyRentalsPage() {
    const [activeFilter, setActiveFilter] = useState("All")

    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "customer") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    const bookings = [
        {
            id: 1,
            equipmentName: "Heavy Duty Excavator",
            category: "Construction",
            image: "/images/equipment/excavator.jpg",
            bookingDate: "Nov 15, 2026",
            startDate: "Nov 20, 2026",
            endDate: "Nov 23, 2026",
            duration: 3,
            totalPrice: 25500,
            status: "Active",
        },
        {
            id: 2,
            equipmentName: "Professional DSLR Camera",
            category: "Photography",
            image: "/images/equipment/camera.jpg",
            bookingDate: "Nov 16, 2026",
            startDate: "Nov 22, 2026",
            endDate: "Nov 24, 2026",
            duration: 2,
            totalPrice: 5000,
            status: "Pending",
        },
        {
            id: 3,
            equipmentName: "Industrial Power Generator",
            category: "Electronics",
            image: "/images/equipment/generator.jpg",
            bookingDate: "Nov 05, 2026",
            startDate: "Nov 08, 2026",
            endDate: "Nov 10, 2026",
            duration: 2,
            totalPrice: 3600,
            status: "Completed",
        },
        {
            id: 4,
            equipmentName: "Agricultural Tractor",
            category: "Agriculture",
            image: "/images/equipment/tractor.jpg",
            bookingDate: "Nov 10, 2026",
            startDate: "Nov 25, 2026",
            endDate: "Nov 27, 2026",
            duration: 2,
            totalPrice: 10000,
            status: "Cancelled",
        },
    ];

    const filters = ["All", "Active", "Pending", "Completed", "Cancelled"];

    const filteredBookings =
        activeFilter === "All"
            ? bookings
            : bookings.filter(
                (booking) => booking.status === activeFilter
            );



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
                Showing {filteredBookings.length} of {bookings.length} bookings
            </p>

            {/* Booking List */}
            {filteredBookings.length > 0 ? (
                <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row">
                                {/* Equipment Image */}
                                <img
                                    src={booking.image}
                                    alt={booking.equipmentName}
                                    className="h-32 w-full rounded-lg object-cover sm:w-40"
                                />

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
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${booking.status === "Active"
                                                    ? "bg-green-50 text-green-700"
                                                    : booking.status === "Pending"
                                                        ? "bg-yellow-50 text-yellow-700"
                                                        : booking.status === "Completed"
                                                            ? "bg-blue-50 text-blue-700"
                                                            : "bg-red-50 text-red-700"
                                                }`}
                                        >
                                            {booking.status}
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
                                        </div>

                                        <button className="rounded-lg border border-[#142B45] px-4 py-2 text-sm font-medium text-[#142B45] transition hover:bg-[#142B45] hover:text-white">
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
                </div>
            )}
        </div>
    );


}
