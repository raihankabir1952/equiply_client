
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

import {
    Users,
    Package,
    Clock,
    CalendarDays,
} from "lucide-react";

export default function AdminDashboard() {
    const router = useRouter();

    const { data: session, isPending } = useSession();

    const [analytics, setAnalytics] = useState(null);
    const [recentEquipment, setRecentEquipment] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isEquipmentLoading, setIsEquipmentLoading] = useState(true);

    const [error, setError] = useState("");
    const [equipmentError, setEquipmentError] = useState("");

    // Authentication Check
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    // Fetch Admin Analytics
    useEffect(() => {
        if (isPending || !session || session.user.role !== "admin") {
            return;
        }

        const fetchAnalytics = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await apiFetch("/analytics/admin");

                if (!response.ok) {
                    throw new Error("Failed to load dashboard statistics.");
                }

                const data = await response.json();

                setAnalytics(data.analytics);
            } catch (error) {
                console.error("Dashboard analytics error:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [session, isPending]);

    // Fetch Recent Equipment and Users
    useEffect(() => {
        if (isPending || !session || session.user.role !== "admin") {
            return;
        }

        const fetchRecentEquipment = async () => {
            try {
                setIsEquipmentLoading(true);
                setEquipmentError("");

                const [equipmentResponse, usersResponse] = await Promise.all([
                    apiFetch("/equipment"),
                    apiFetch("/users"),
                ]);

                if (!equipmentResponse.ok || !usersResponse.ok) {
                    throw new Error("Failed to load recent equipment.");
                }

                const equipmentData = await equipmentResponse.json();
                const usersData = await usersResponse.json();

                const equipments = equipmentData.equipments || [];
                const users = usersData.users || [];

                // Sort by newest equipment
                const sortedEquipments = [...equipments].sort(
                    (a, b) =>
                        new Date(b.createdAt || 0) -
                        new Date(a.createdAt || 0)
                );

                // Get latest 3 equipment
                const latestEquipment = sortedEquipments.slice(0, 3);

                // Find equipment owner
                const equipmentWithOwner = latestEquipment.map((equipment) => {
                    const owner = users.find(
                        (user) =>
                            String(user._id || user.id) ===
                            String(equipment.ownerId)
                    );

                    return {
                        ...equipment,
                        ownerName: owner?.name || "Unknown Owner",
                    };
                });

                setRecentEquipment(equipmentWithOwner);
            } catch (error) {
                console.error("Recent equipment error:", error);
                setEquipmentError(error.message);
            } finally {
                setIsEquipmentLoading(false);
            }
        };

        fetchRecentEquipment();
    }, [session, isPending]);

    if (isPending || !session || session.user.role !== "admin") {
        return <p>Loading...</p>;
    }

    const adminStats = [
        {
            title: "Total Users",
            value: analytics?.totalUsers ?? 0,
            icon: Users,
        },
        {
            title: "Total Equipment",
            value: analytics?.totalEquipment ?? 0,
            icon: Package,
        },
        {
            title: "Pending Approvals",
            value: analytics?.pendingApprovals ?? 0,
            icon: Clock,
        },
        {
            title: "Total Rentals",
            value: analytics?.totalBookings ?? 0,
            icon: CalendarDays,
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

            {/* Analytics Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

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
                                {isLoading ? "..." : stat.value}
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

                {equipmentError && (
                    <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        {equipmentError}
                    </p>
                )}

                {isEquipmentLoading ? (
                    <p className="py-8 text-center text-sm text-gray-500">
                        Loading recent equipment...
                    </p>
                ) : recentEquipment.length > 0 ? (
                    <div className="space-y-4">
                        {recentEquipment.map((equipment) => (
                            <div
                                key={equipment._id}
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
                                        {equipment.category} · Owner: {equipment.ownerName}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                    <p className="font-semibold text-[#142B45]">
                                        ৳{Number(equipment.price || 0).toLocaleString("en-BD")} / day
                                    </p>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            equipment.status === "approved"
                                                ? "bg-green-50 text-green-700"
                                                : equipment.status === "pending"
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
                ) : (
                    !equipmentError && (
                        <p className="py-8 text-center text-sm text-gray-500">
                            No equipment found.
                        </p>
                    )
                )}
            </div>

        </div>
    );
}
