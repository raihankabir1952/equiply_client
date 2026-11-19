
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Package,
    CheckCircle,
    Clock,
    ClipboardList,
} from "lucide-react";

export default function OwnerDashboard() {
    const router = useRouter();

    const { data: session, isPending } = useSession();

    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rentals, setRentals] = useState([]);

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

    // Fetch Owner Rentals
    useEffect(() => {
        if (!isPending && session?.user?.role === "owner") {
            const fetchRentals = async () => {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/rentals/owner-rentals`,
                        {
                            credentials: "include",
                        }
                    );

                    const data = await res.json();

                    if (res.ok) {
                        setRentals(data.rentals || []);
                    } else {
                        console.error(data.message);
                    }
                } catch (error) {
                    console.error("Rental fetch error:", error);
                }
            };

            fetchRentals();
        }
    }, [session, isPending]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    // Equipment Statistics
    const equipmentStats = [
        {
            title: "Total Equipment",
            value: loading ? "..." : equipment.length,
            icon: Package,
        },
        {
            title: "Available Equipment",
            value: loading
                ? "..."
                : equipment.filter(
                    (item) => item.availableQuantity > 0
                ).length,
            icon: CheckCircle,
        },
        {
            title: "Pending Approval",
            value: loading
                ? "..."
                : equipment.filter(
                    (item) => item.status === "pending"
                ).length,
            icon: Clock,
        },
        {
            title: "Active Rentals",
            value: rentals.filter(
                (rental) =>
                    rental.status === "confirmed" ||
                    rental.status === "active"
            ).length,
            icon: ClipboardList,
        },
    ];

    return (
        <div className="space-y-8">

            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    Welcome back, {session.user.name}! 👋
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Here's what's happening with your equipment today.
                </p>
            </div>

            {/* Equipment Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {equipmentStats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                    {stat.title}
                                </p>

                                <div className="rounded-lg bg-green-50 p-3">
                                    <Icon className="h-5 w-5 text-[#35C77A]" />
                                </div>
                            </div>

                            <h2 className="mt-4 text-3xl font-bold text-[#142B45]">
                                {stat.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* Recent Rentals */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[#142B45]">
                            Recent Rentals
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Latest rental activities for your equipment.
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/dashboard/owner/rentals")}
                        className="text-sm font-semibold text-[#35C77A] hover:underline"
                    >
                        View All
                    </button>
                </div>

                <div className="space-y-4">
                    {rentals.length === 0 ? (
                        <p className="py-8 text-center text-sm text-gray-500">
                            No rental activities yet.
                        </p>
                    ) : (
                        rentals.slice(0, 3).map((rental) => (
                            <div
                                key={rental._id}
                                className="flex flex-col gap-4 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-center"
                            >
                                <img
                                    src={
                                        rental.equipment?.image ||
                                        "/images/equipment/default.jpg"
                                    }
                                    alt={rental.equipment?.name || "Equipment"}
                                    className="h-16 w-16 rounded-lg object-cover"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-[#142B45]">
                                        {rental.equipment?.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {rental.equipment?.category} ·{" "}
                                        {new Date(
                                            rental.startDate
                                        ).toLocaleDateString("en-BD")}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                    <p className="font-semibold text-[#142B45]">
                                        ৳
                                        {rental.equipment?.price?.toLocaleString(
                                            "en-BD"
                                        )}{" "}
                                        / day
                                    </p>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            rental.status === "confirmed" ||
                                            rental.status === "active"
                                                ? "bg-green-50 text-green-700"
                                                : rental.status === "pending"
                                                    ? "bg-yellow-50 text-yellow-700"
                                                    : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {rental.status
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            rental.status?.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    );
}
