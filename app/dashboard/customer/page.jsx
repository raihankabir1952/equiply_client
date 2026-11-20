
"use client";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CalendarDays,
    Clock,
    CheckCircle,
    Hourglass,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function CustomerDashboard() {
    const [rentals, setRentals] = useState([]);
    const [loadingRentals, setLoadingRentals] = useState(true);

    const router = useRouter();
    const { data: session, isPending } = useSession();

    // Check authentication and customer role
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
                console.log("API Status:", res.status);
                console.log("API Response:", data);
                console.log("Equipment Data:", data.rentals?.[0]?.equipment);

                if (res.ok) {
                    setRentals(data.rentals || []);
                } else {
                    console.error("Failed to fetch rentals:", data.message);
                }
            } catch (error) {
                console.error("Failed to fetch rentals:", error);
            } finally {
                setLoadingRentals(false);
            }
        };

        fetchRentals();
    }, [session, isPending]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    // Rental statistics
    const rentalStats = [
        {
            title: "Total Rentals",
            value: rentals.length,
            icon: CalendarDays,
        },
        {
            title: "Active Rentals",
            value: rentals.filter(
                (rental) =>
                    rental.status === "confirmed" ||
                    rental.status === "active"
            ).length,
            icon: Clock,
        },
        {
            title: "Completed Rentals",
            value: rentals.filter(
                (rental) => rental.status === "completed"
            ).length,
            icon: CheckCircle,
        },
        {
            title: "Pending Rentals",
            value: rentals.filter(
                (rental) => rental.status === "pending"
            ).length,
            icon: Hourglass,
        },
    ];

    // Recent rentals
    const recentRentals = rentals.slice(0, 3).map((rental) => ({
        id: rental._id,
        name: rental.equipment?.name || "Equipment",
        category: rental.equipment?.category || "General",
        image: rental.equipment?.image,
        price: rental.equipment?.price || 0,
        status: rental.status,
        startDate: new Date(rental.startDate).toLocaleDateString("en-BD", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
    }));

    return (
        <div className="space-y-8">

            {/* Welcome Section */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    Welcome back, {session.user.name}! 👋
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Here's what's happening with your rentals today.
                </p>
            </div>

            {/* Rental Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {rentalStats.map((stat) => {
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
                                {loadingRentals ? "..." : stat.value}
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
                            Your latest equipment rental activities.
                        </p>
                    </div>

                    <button
                        onClick={() => router.push("/dashboard/customer/rentals")}
                        className="text-sm font-semibold text-[#35C77A] hover:underline"
                    >
                        View All
                    </button>
                </div>

                {loadingRentals ? (
                    <p className="py-8 text-center text-sm text-gray-500">
                        Loading rentals...
                    </p>
                ) : recentRentals.length === 0 ? (
                    <div className="py-10 text-center">
                        <p className="font-medium text-[#142B45]">
                            No rentals found.
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Start renting equipment to see your activities here.
                        </p>

                        <button
                            onClick={() => router.push("/equipment")}
                            className="mt-4 rounded-lg bg-[#35C77A] px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
                        >
                            Explore Equipment
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recentRentals.map((rental) => (
                            <div
                                key={rental.id}
                                className="flex flex-col gap-4 rounded-lg border border-gray-100 p-4 sm:flex-row sm:items-center"
                            >
                                {rental.image ? (
                                    <img
                                        src={rental.image}
                                        alt={rental.name}
                                        className="h-16 w-16 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                        No Image
                                    </div>
                                )}

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
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${rental.status === "confirmed" ||
                                            rental.status === "active"
                                                ? rental.status === "confirmed"
                                                    ? "bg-blue-50 text-blue-700"
                                                    : "bg-purple-50 text-purple-700"
                                                : rental.status === "pending"
                                                    ? "bg-yellow-50 text-yellow-700"
                                                    : rental.status === "completed"
                                                        ? "bg-green-50 text-green-700"
                                                        : rental.status === "cancelled"
                                                            ? "bg-red-50 text-red-700"
                                                            : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {rental.status.charAt(0).toUpperCase() +
                                            rental.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
