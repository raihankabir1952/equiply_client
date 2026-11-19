
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    Users,
    Package,
    Clock,
    CalendarDays,
    CheckCircle,
    XCircle,
} from "lucide-react";

export default function AdminDashboard() {
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

    const adminStats = [
        {
            title: "Total Users",
            value: 25,
            icon: Users,
        },
        {
            title: "Total Equipment",
            value: 18,
            icon: Package,
        },
        {
            title: "Pending Approvals",
            value: 4,
            icon: Clock,
        },
        {
            title: "Total Rentals",
            value: 32,
            icon: CalendarDays,
        },
    ];

    const recentEquipment = [
        {
            id: 1,
            name: "Heavy Duty Excavator",
            category: "Construction",
            owner: "John Smith",
            price: 8500,
            status: "Pending",
        },
        {
            id: 2,
            name: "Professional DSLR Camera",
            category: "Photography",
            owner: "Michael Brown",
            price: 2500,
            status: "Approved",
        },
        {
            id: 3,
            name: "Industrial Power Generator",
            category: "Electronics",
            owner: "David Wilson",
            price: 1800,
            status: "Rejected",
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
                    Here's what's happening with Equiply today.
                </p>
            </div>

            {/* Admin Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {adminStats.map((stat) => {
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

            {/* Recent Equipment */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

                <div className="mb-6">
                    <h2 className="text-lg font-bold text-[#142B45]">
                        Recent Equipment
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Latest equipment submitted by owners.
                    </p>
                </div>

                <div className="space-y-4">
                    {recentEquipment.map((equipment) => (
                        <div
                            key={equipment.id}
                            className="flex flex-col gap-4 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-center"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-50">
                                <Package className="h-7 w-7 text-[#35C77A]" />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-semibold text-[#142B45]">
                                    {equipment.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {equipment.category} · Owner: {equipment.owner}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                <p className="font-semibold text-[#142B45]">
                                    ৳{equipment.price.toLocaleString("en-BD")} / day
                                </p>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        equipment.status === "Approved"
                                            ? "bg-green-50 text-green-700"
                                            : equipment.status === "Pending"
                                                ? "bg-yellow-50 text-yellow-700"
                                                : "bg-red-50 text-red-700"
                                    }`}
                                >
                                    {equipment.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
