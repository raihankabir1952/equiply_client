
"use client";

import { useSession } from "@/lib/auth-client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

function RentalDetailsContent() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);

    // Authentication check
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "customer") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    // Fetch rental details
    useEffect(() => {
        if (!id || isPending || !session || session.user.role !== "customer") {
            return;
        }

        const fetchRentalDetails = async () => {
            try {
                const res = await apiFetch(`/rentals/${id}`);

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch rental details!");
                }

                setRental(data.rental || data);
            } catch (error) {
                console.error("Rental details error:", error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRentalDetails();
    }, [id, session, isPending]);

    const formatDate = (date) => {
        if (!date) return "N/A";

        return new Date(date).toLocaleDateString("en-BD", {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Dhaka",
        });
    };

    const formatDateTime = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleString("en-BD", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Dhaka",
        });
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "confirmed":
            case "active":
            case "paid":
                return "bg-green-50 text-green-700";
            case "pending":
            case "unpaid":
                return "bg-yellow-50 text-yellow-700";
            case "completed":
                return "bg-blue-50 text-blue-700";
            case "cancelled":
                return "bg-red-50 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    if (isPending || !session || loading) {
        return (
            <div className="py-16 text-center text-sm text-gray-500">
                Loading rental details...
            </div>
        );
    }

    if (!rental) {
        return (
            <div className="rounded-xl border bg-white p-10 text-center">
                <h2 className="text-lg font-semibold text-[#142B45]">
                    Rental Not Found
                </h2>

                <button
                    onClick={() => router.push("/dashboard/customer/rentals")}
                    className="mt-5 rounded-lg bg-[#142B45] px-5 py-2.5 text-sm font-medium text-white"
                >
                    Back to My Rentals
                </button>
            </div>
        );
    }

    const equipment = rental.equipment || {};

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <button
                    onClick={() => router.push("/dashboard/customer/rentals")}
                    className="mb-4 text-sm font-medium text-[#35C77A] hover:underline"
                >
                    ← Back to My Rentals
                </button>

                <h1 className="text-2xl font-bold text-[#142B45]">
                    Rental Details
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    View your booking and payment information.
                </p>
            </div>

            {/* Equipment Information */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-col gap-5 p-5 sm:flex-row">
                    {equipment.image ? (
                        <img
                            src={equipment.image}
                            alt={equipment.name || "Equipment"}
                            className="h-48 w-full rounded-lg object-cover sm:w-64"
                        />
                    ) : (
                        <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400 sm:w-64">
                            No Image
                        </div>
                    )}

                    <div className="flex flex-1 flex-col justify-center">
                        <p className="text-sm text-gray-500">
                            {equipment.category || "General"}
                        </p>

                        <h2 className="mt-2 text-xl font-bold text-[#142B45]">
                            {equipment.name || "Equipment"}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {equipment.location || "Location not available"}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(rental.status)}`}
                            >
                                {rental.status}
                            </span>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(rental.paymentStatus)}`}
                            >
                                Payment: {rental.paymentStatus}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Information */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold text-[#142B45]">
                    Booking Information
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <DetailItem
                        label="Start Date"
                        value={formatDate(rental.startDate)}
                    />

                    <DetailItem
                        label="End Date"
                        value={formatDate(rental.endDate)}
                    />

                    <DetailItem
                        label="Rental Duration"
                        value={`${rental.rentalDays || 0} Days`}
                    />

                    <DetailItem
                        label="Quantity"
                        value={rental.quantity || 0}
                    />

                    <DetailItem
                        label="Contact Number"
                        value={rental.contactNumber || "N/A"}
                    />

                    <DetailItem
                        label="Delivery Address"
                        value={rental.address || "N/A"}
                    />

                    <DetailItem
                        label="Additional Notes"
                        value={rental.notes || "No additional notes"}
                    />
                </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold text-[#142B45]">
                    Payment Information
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <DetailItem
                        label="Total Amount"
                        value={`৳${Number(rental.totalAmount || 0).toLocaleString("en-BD")}`}
                    />

                    <DetailItem
                        label="Payment Status"
                        value={rental.paymentStatus || "Unpaid"}
                    />

                    <DetailItem
                        label="Payment Date & Time"
                        value={formatDateTime(rental.paidAt)}
                    />

                    <DetailItem
                        label="Booking Created"
                        value={formatDateTime(rental.createdAt)}
                    />
                </div>
            </div>
        </div>
    );
}

function DetailItem({ label, value }) {
    return (
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="mt-1 break-words text-sm font-medium text-gray-700">
                {value}
            </p>
        </div>
    );
}

export default function RentalDetailsPage() {
    return (
        <Suspense
            fallback={
                <div className="py-16 text-center text-sm text-gray-500">
                    Loading rental details...
                </div>
            }
        >
            <RentalDetailsContent />
        </Suspense>
    );
}
