
"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { CalendarDays, ClipboardList } from "lucide-react";

const rentalData = [
    {
        id: 1,
        customer: "Tanvir Ahmed",
        email: "tanvir@example.com",
        equipment: "Professional DSLR Camera",
        duration: "18 Nov - 20 Nov, 2026",
        quantity: 1,
        amount: 5000,
        paymentStatus: "Paid",
        bookingStatus: "Confirmed",
    },
    {
        id: 2,
        customer: "Nusrat Jahan",
        email: "nusrat@example.com",
        equipment: "Heavy Duty Excavator",
        duration: "19 Nov - 21 Nov, 2026",
        quantity: 1,
        amount: 25500,
        paymentStatus: "Pending",
        bookingStatus: "Pending",
    },
    {
        id: 3,
        customer: "Arif Hossain",
        email: "arif@example.com",
        equipment: "Industrial Power Generator",
        duration: "20 Nov - 22 Nov, 2026",
        quantity: 2,
        amount: 10800,
        paymentStatus: "Paid",
        bookingStatus: "Completed",
    },
];

export default function OwnerRentalsPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "owner") {
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
                                {rentalData.length}
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
                                {rentalData.filter(
                                    (item) => item.bookingStatus === "Confirmed"
                                ).length}
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
                            {rentalData.map((rental) => (
                                <tr
                                    key={rental.id}
                                    className="text-sm transition hover:bg-gray-50"
                                >

                                    {/* Customer Information */}
                                    <td className="px-5 py-4">
                                        <p className="font-semibold text-[#142B45]">
                                            {rental.customer}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {rental.email}
                                        </p>
                                    </td>

                                    {/* Equipment Information */}
                                    <td className="px-5 py-4 font-medium text-[#142B45]">
                                        {rental.equipment}
                                    </td>

                                    {/* Rental Duration */}
                                    <td className="px-5 py-4 whitespace-nowrap text-gray-600">
                                        {rental.duration}
                                    </td>

                                    {/* Required Quantity */}
                                    <td className="px-5 py-4 text-gray-600">
                                        {rental.quantity}
                                    </td>

                                    {/* Booking Amount */}
                                    <td className="px-5 py-4 font-semibold text-[#142B45]">
                                        ৳{rental.amount.toLocaleString()}
                                    </td>

                                    {/* Payment Status */}
                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                rental.paymentStatus === "Paid"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-yellow-50 text-yellow-700"
                                            }`}
                                        >
                                            {rental.paymentStatus}
                                        </span>
                                    </td>

                                    {/* Booking Status */}
                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                rental.bookingStatus === "Confirmed"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : rental.bookingStatus === "Completed"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-yellow-50 text-yellow-700"
                                            }`}
                                        >
                                            {rental.bookingStatus}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-5 py-4">
                    <p className="text-sm text-gray-500">
                        Showing {rentalData.length} rental records
                    </p>
                </div>
            </div>

        </div>
    );
}
