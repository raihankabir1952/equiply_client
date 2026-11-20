
"use client";

import { useEffect, useState } from "react";
import {
    Package,
    CheckCircle,
    Wallet,
    TrendingUp,
} from "lucide-react";

import { apiFetch } from "@/lib/api";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount || 0);
};

const formatMonth = (month) => {
    const [year, monthNumber] = month.split("-");

    return new Date(
        Number(year),
        Number(monthNumber) - 1
    ).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
    });
};

export default function OwnerAnalyticsPage() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await apiFetch("/analytics/owner");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch analytics!"
                    );
                }

                setAnalytics(data.analytics);
            } catch (error) {
                console.error("Owner analytics error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const monthlyData = (analytics?.monthlyEarnings || []).map((item) => ({
        month: formatMonth(item._id),
        earnings: item.totalEarnings,
    }));

    const statCards = [
        {
            title: "Total Equipment",
            value: analytics?.totalEquipment || 0,
            icon: Package,
            description: "Your listed equipment",
        },
        {
            title: "Completed Rentals",
            value: analytics?.completedRentals || 0,
            icon: CheckCircle,
            description: "Successfully completed rentals",
        },
        {
            title: "Total Earnings",
            value: formatCurrency(analytics?.totalEarnings),
            icon: Wallet,
            description: "From successful payments",
        },
    ];

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading analytics...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <p className="font-medium text-red-600">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Owner Analytics
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Track your equipment performance and earnings.
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {statCards.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-500">
                                    {item.title}
                                </p>

                                <div className="rounded-lg bg-green-50 p-2.5">
                                    <Icon className="h-5 w-5 text-green-600" />
                                </div>
                            </div>

                            <h2 className="mt-4 text-2xl font-bold text-gray-900">
                                {item.value}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Monthly Earnings Chart */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-green-50 p-2.5">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            Monthly Earnings
                        </h2>
                        <p className="text-sm text-gray-500">
                            Your earnings from the last 6 months
                        </p>
                    </div>
                </div>

                {monthlyData.length > 0 ? (
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={monthlyData}
                                margin={{
                                    top: 10,
                                    right: 15,
                                    left: 10,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 12 }}
                                />

                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) =>
                                        value >= 1000
                                            ? `${value / 1000}k`
                                            : value
                                    }
                                />

                                <Tooltip
                                    formatter={(value) => [
                                        formatCurrency(value),
                                        "Earnings",
                                    ]}
                                    contentStyle={{
                                        borderRadius: "10px",
                                        border: "1px solid #e5e7eb",
                                    }}
                                />

                                <Bar
                                    dataKey="earnings"
                                    name="Earnings"
                                    fill="#35C77A"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={55}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="flex h-[280px] items-center justify-center rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-500">
                            No earnings data available yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
