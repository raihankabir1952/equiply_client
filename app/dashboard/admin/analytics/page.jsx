
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
    CheckCircle,
    DollarSign,
} from "lucide-react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function AdminAnalytics() {
    const router = useRouter();

    const { data: session, isPending } = useSession();

    const [analytics, setAnalytics] = useState(null);
    const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(true);
    const [error, setError] = useState("");

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
                setIsAnalyticsLoading(true);
                setError("");

                const response = await apiFetch("/analytics/admin");

                if (!response.ok) {
                    throw new Error("Failed to load analytics data.");
                }

                const data = await response.json();
                setAnalytics(data.analytics);

            } catch (error) {
                console.error("Analytics error:", error);
                setError(error.message);
            } finally {
                setIsAnalyticsLoading(false);
            }
        };

        fetchAnalytics();
    }, [session, isPending]);

    if (isPending || !session || session.user.role !== "admin") {
        return <p>Loading...</p>;
    }

    const adminStats = [
        {
            title: "Total Users",
            value: analytics?.totalUsers ?? 0,
            icon: Users,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Total Equipment",
            value: analytics?.totalEquipment ?? 0,
            icon: Package,
            color: "bg-green-50 text-[#35C77A]",
        },
        {
            title: "Pending Approvals",
            value: analytics?.pendingApprovals ?? 0,
            icon: Clock,
            color: "bg-yellow-50 text-yellow-600",
        },
        {
            title: "Total Bookings",
            value: analytics?.totalBookings ?? 0,
            icon: CalendarDays,
            color: "bg-purple-50 text-purple-600",
        },
        {
            title: "Completed Rentals",
            value: analytics?.completedRentals ?? 0,
            icon: CheckCircle,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Total Revenue",
            value: `৳${(analytics?.totalRevenue ?? 0).toLocaleString("en-BD")}`,
            icon: DollarSign,
            color: "bg-orange-50 text-orange-600",
        },
    ];

    // Format Monthly Booking Data
    const monthlyBookings = (analytics?.monthlyBookings ?? []).map((item) => {
        const [year, month] = item._id.split("-");
        const date = new Date(Number(year), Number(month) - 1);

        return {
            month: date.toLocaleDateString("en-US", {
                month: "short",
                year: "2-digit",
            }),
            bookings: item.totalBookings,
        };
    });

    return (
        <div className="space-y-8">

            {/* Page Heading */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    Admin Analytics
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Monitor platform performance and booking statistics.
                </p>
            </div>

            {/* Analytics Error */}
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Admin Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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

                                <div className={`rounded-lg p-3 ${stat.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>

                            <h2 className="mt-4 text-3xl font-bold text-[#142B45]">
                                {isAnalyticsLoading ? "..." : stat.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* Monthly Bookings Chart */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-[#142B45]">
                        Monthly Bookings
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Booking activity over the last six months.
                    </p>
                </div>

                {isAnalyticsLoading ? (
                    <div className="flex h-72 items-center justify-center text-sm text-gray-500">
                        Loading chart...
                    </div>
                ) : monthlyBookings.length > 0 ? (
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={monthlyBookings}
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="month"
                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "10px",
                                        border: "1px solid #e5e7eb",
                                    }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="bookings"
                                    name="Bookings"
                                    stroke="#35C77A"
                                    strokeWidth={3}
                                    dot={{
                                        r: 5,
                                        fill: "#35C77A",
                                    }}
                                    activeDot={{ r: 7 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="flex h-72 items-center justify-center text-sm text-gray-500">
                        No booking data available yet.
                    </div>
                )}
            </div>

        </div>
    );
}
