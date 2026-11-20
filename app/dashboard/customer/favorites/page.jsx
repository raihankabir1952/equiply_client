
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

export default function FavoritesPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [favoriteEquipment, setFavoriteEquipment] = useState([]);
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

    // Fetch customer favorites
    useEffect(() => {
        if (isPending || !session || session.user.role !== "customer") {
            return;
        }

        const fetchFavorites = async () => {
            try {
                const res = await apiFetch("/favorites");

                const data = await res.json();
                console.log(data.favorites);

                if (res.ok) {
                    setFavoriteEquipment(
                        (data.favorites || []).map((favorite) => ({
                            id: favorite.equipment?._id,
                            favoriteId: favorite._id,
                            name: favorite.equipment?.name,
                            category: favorite.equipment?.category,
                            image: favorite.equipment?.image,
                            price: favorite.equipment?.price,
                            availableQuantity: favorite.equipment?.availableQuantity,
                            status: favorite.equipment?.status,
                        }))
                    );
                } else {
                    console.error("Failed to fetch favorites:", data.message);
                }
            } catch (error) {
                console.error("Failed to fetch favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [session, isPending]);

    // Remove favorite
    const handleRemoveFavorite = async (id) => {
        try {
            const res = await apiFetch(`/favorites/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (res.ok) {
                setFavoriteEquipment((prev) =>
                    prev.filter((item) => item.id !== id)
                );
                toast.success("Removed from favorites!")
            } else {
                console.error("Failed to remove favorite:", data.message);
            }
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
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

            {/* Loading State */}
            {loading ? (
                <p className="py-12 text-center text-gray-500">
                    Loading favorites...
                </p>
            ) : favoriteEquipment.length > 0 ? (
                /* Favorite Equipment Grid */
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
                                    onClick={() => handleRemoveFavorite(item.id)}
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
                                </div>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div>
                                        <p className="text-lg font-bold text-[#142B45]">
                                            ৳{Number(item.price || 0).toLocaleString("en-BD")}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            per day
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                        {item.availability || "Available"}
                                    </span>
                                </div>

                                <button
                                    onClick={() => router.push(`/equipment/${item.id}`)}
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

                    <button
                        onClick={() => router.push("/equipment")}
                        className="mt-4 rounded-lg bg-[#35C77A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
                    >
                        Explore Equipment
                    </button>
                </div>
            )}
        </div>
    );
}
