
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [favoriteEquipment, setFavoriteEquipment] = useState([
        {
            id: 1,
            name: "Heavy Duty Excavator",
            category: "Construction",
            image: "/images/equipment/excavator.jpg",
            price: 8500,
            rentalType: "Day",
            location: "Dhaka",
            availability: "Available",
        },
        {
            id: 2,
            name: "Professional DSLR Camera",
            category: "Photography",
            image: "/images/equipment/camera.jpg",
            price: 2500,
            rentalType: "Day",
            location: "Chattogram",
            availability: "Available",
        },
        {
            id: 3,
            name: "Industrial Power Generator",
            category: "Electronics",
            image: "/images/equipment/generator.jpg",
            price: 1800,
            rentalType: "Day",
            location: "Dhaka",
            availability: "Rented",
        },
        {
            id: 4,
            name: "Agricultural Tractor",
            category: "Agriculture",
            image: "/images/equipment/tractor.jpg",
            price: 5000,
            rentalType: "Day",
            location: "Rajshahi",
            availability: "Available",
        },
    ]);

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "customer") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    const handleRemoveFavorite = (id) => {
        setFavoriteEquipment((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    My Favorites
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Your saved equipment, all in one place.
                </p>
            </div>

            {/* Favorite Equipment Grid */}
            {favoriteEquipment.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {favoriteEquipment.map((item) => (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Equipment Image */}
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-48 w-full object-cover"
                                />

                                {/* Remove Favorite */}
                                <button
                                    onClick={() =>
                                        handleRemoveFavorite(item.id)
                                    }
                                    className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm transition hover:scale-110"
                                    aria-label="Remove from favorites"
                                    title="Remove from favorites"
                                >
                                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                                </button>
                            </div>

                            {/* Equipment Information */}
                            <div className="space-y-4 p-5">
                                <div>
                                    <p className="text-xs font-medium text-[#35C77A]">
                                        {item.category}
                                    </p>

                                    <h3 className="mt-1 text-lg font-bold text-[#142B45]">
                                        {item.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        📍 {item.location}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div>
                                        <p className="text-lg font-bold text-[#142B45]">
                                            ৳{item.price.toLocaleString("en-BD")}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            per {item.rentalType}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                            item.availability === "Available"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-gray-100 text-gray-600"
                                        }`}
                                    >
                                        {item.availability}
                                    </span>
                                </div>

                                <button
                                    className="w-full rounded-lg bg-[#142B45] py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d3d5e]"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty Favorites State */
                <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                    <Heart className="mx-auto h-12 w-12 text-gray-300" />

                    <h3 className="mt-4 text-lg font-semibold text-[#142B45]">
                        No Favorites Yet
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        You haven't saved any equipment to your favorites.
                    </p>
                </div>
            )}
        </div>
    );
}
