
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    Package,
    CheckCircle,
    Clock,
    ClipboardList,
} from "lucide-react";

export default function OwnerDashboard() {
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

    const equipmentStats = [
        {
            title: "Total Equipment",
            value: 12,
            icon: Package,
        },
        {
            title: "Available Equipment",
            value: 8,
            icon: CheckCircle,
        },
        {
            title: "Pending Approval",
            value: 2,
            icon: Clock,
        },
        {
            title: "Active Rentals",
            value: 5,
            icon: ClipboardList,
        },
    ];

    const recentRentals = [
        {
            id: 1,
            name: "Heavy Duty Excavator",
            category: "Construction",
            image: "/images/equipment/excavator.jpg",
            price: 8500,
            status: "Active",
            startDate: "Nov 15, 2026",
        },
        {
            id: 2,
            name: "Professional DSLR Camera",
            category: "Photography",
            image: "/images/equipment/camera.jpg",
            price: 2500,
            status: "Pending",
            startDate: "Nov 17, 2026",
        },
        {
            id: 3,
            name: "Industrial Power Generator",
            category: "Electronics",
            image: "/images/equipment/generator.jpg",
            price: 1800,
            status: "Completed",
            startDate: "Nov 10, 2026",
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
                    {recentRentals.map((rental) => (
                        <div
                            key={rental.id}
                            className="flex flex-col gap-4 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-center"
                        >
                            <img
                                src={rental.image}
                                alt={rental.name}
                                className="h-16 w-16 rounded-lg object-cover"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold text-[#142B45]">
                                    {rental.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {rental.category} · {rental.startDate}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                <p className="font-semibold text-[#142B45]">
                                    ৳{rental.price.toLocaleString("en-BD")} / day
                                </p>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        rental.status === "Active"
                                            ? "bg-green-50 text-green-700"
                                            : rental.status === "Pending"
                                                ? "bg-yellow-50 text-yellow-700"
                                                : "bg-gray-100 text-gray-600"
                                    }`}
                                >
                                    {rental.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
