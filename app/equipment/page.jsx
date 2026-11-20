
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Search,
    MapPin,
    ArrowRight,
    SlidersHorizontal,
    ArrowUpRight,
    Heart,
} from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";

export default function EquipmentPage() {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [availability, setAvailability] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("newest");

    const [categories, setCategories] = useState([]);
    const [urlInitialized, setUrlInitialized] = useState(false);

    // Favorite states
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [favoriteLoading, setFavoriteLoading] = useState([]);

    // Read filters from URL on page load
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setSearch(params.get("search") || "");
        setCategory(params.get("category") || "");
        setAvailability(params.get("availability") || "");
        setMinPrice(params.get("minPrice") || "");
        setMaxPrice(params.get("maxPrice") || "");
        setSort(params.get("sort") || "newest");

        setUrlInitialized(true);
    }, []);

    // Fetch customer's favorites
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await apiFetch("/favorites");
                const data = await res.json();

                if (!res.ok) return;

                const favorites = data.favorites || [];

                setFavoriteIds(
                    favorites.map((item) =>
                        String(item.equipmentId?._id || item.equipmentId)
                    )
                );
            } catch (error) {
                // User may not be logged in
            }
        };

        fetchFavorites();
    }, []);

    // Update browser URL when filters change
    useEffect(() => {
        if (!urlInitialized) return;

        const params = new URLSearchParams();

        if (search.trim()) params.set("search", search.trim());
        if (category) params.set("category", category);
        if (availability) params.set("availability", availability);
        if (minPrice !== "") params.set("minPrice", minPrice);
        if (maxPrice !== "") params.set("maxPrice", maxPrice);
        if (sort !== "newest") params.set("sort", sort);

        const queryString = params.toString();

        const newUrl = queryString
            ? `/equipment?${queryString}`
            : "/equipment";

        window.history.replaceState(null, "", newUrl);
    }, [
        search,
        category,
        availability,
        minPrice,
        maxPrice,
        sort,
        urlInitialized,
    ]);

    // Fetch equipment from backend
    useEffect(() => {
        if (!urlInitialized) return;

        const fetchEquipment = async () => {
            setLoading(true);
            setError("");

            try {
                const params = new URLSearchParams();

                if (search.trim()) params.append("search", search.trim());
                if (category) params.append("category", category);
                if (availability) params.append("availability", availability);
                if (minPrice !== "") params.append("minPrice", minPrice);
                if (maxPrice !== "") params.append("maxPrice", maxPrice);
                if (sort) params.append("sort", sort);

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/equipment/public?${params.toString()}`
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to fetch equipment!"
                    );
                }

                setEquipment(data.equipments || []);

                const uniqueCategories = [
                    ...new Set(
                        (data.equipments || [])
                            .map((item) => item.category)
                            .filter(Boolean)
                    ),
                ];

                setCategories((previous) => [
                    ...new Set([...previous, ...uniqueCategories]),
                ]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchEquipment, 400);

        return () => clearTimeout(timeout);
    }, [
        search,
        category,
        availability,
        minPrice,
        maxPrice,
        sort,
        urlInitialized,
    ]);

    // Add or remove favorite
    const toggleFavorite = async (equipmentId) => {
        if (favoriteLoading.includes(equipmentId)) return;

        setFavoriteLoading((previous) => [...previous, equipmentId]);

        try {
            const isFavorite = favoriteIds.includes(equipmentId);

            const res = isFavorite
                ? await apiFetch(`/favorites/${equipmentId}`, {
                      method: "DELETE",
                  })
                : await apiFetch("/favorites", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          equipmentId,
                      }),
                  });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to update favorite!"
                );
            }

            if (isFavorite) {
                setFavoriteIds((previous) =>
                    previous.filter((id) => id !== equipmentId)
                );

                toast.success("Removed from favorites!");
            } else {
                setFavoriteIds((previous) => [
                    ...previous,
                    equipmentId,
                ]);

                toast.success("Added to favorites!");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            setFavoriteLoading((previous) =>
                previous.filter((id) => id !== equipmentId)
            );
        }
    };

    // Reset all filters
    const resetFilters = () => {
        setSearch("");
        setCategory("");
        setAvailability("");
        setMinPrice("");
        setMaxPrice("");
        setSort("newest");
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-20">

            {/* Hero Section */}
            <section className="bg-[#142B45] px-5 py-20 text-center">
                <div className="mx-auto max-w-3xl">
                    <span className="inline-flex rounded-full border border-[#35C77A]/30 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#35C77A]">
                        Explore Our Collection
                    </span>

                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        Find Your Perfect{" "}
                        <span className="text-[#35C77A]">
                            Equipment
                        </span>
                    </h1>

                    <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
                        Discover quality equipment from trusted owners.
                        Search, compare and rent the equipment you need.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-5 pt-12 lg:px-8">

                {/* Search & Filters */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

                    <div className="mb-6 flex items-center gap-2">
                        <SlidersHorizontal size={20} className="text-[#35C77A]" />
                        <h2 className="text-lg font-bold text-[#142B45]">
                            Find Equipment
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">

                        {/* Search */}
                        <div className="relative lg:col-span-2">
                            <Search
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search equipment..."
                                className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#35C77A]"
                            />
                        </div>

                        {/* Category */}
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 outline-none focus:border-[#35C77A]"
                        >
                            <option value="">All Categories</option>

                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        {/* Availability */}
                        <select
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 outline-none focus:border-[#35C77A]"
                        >
                            <option value="">All Availability</option>
                            <option value="available">Available</option>
                            <option value="unavailable">Unavailable</option>
                        </select>

                        {/* Minimum Price */}
                        <input
                            type="number"
                            min="0"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min Price"
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                        />

                        {/* Maximum Price */}
                        <input
                            type="number"
                            min="0"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max Price"
                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                        />
                    </div>

                    {/* Sorting & Reset */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">

                        <p className="text-sm text-slate-500">
                            {loading
                                ? "Finding equipment..."
                                : `${equipment.length} equipment found`}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#35C77A]"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>

                            <button
                                onClick={resetFilters}
                                className="rounded-lg border border-[#142B45] px-4 py-2.5 text-sm font-semibold text-[#142B45] transition hover:bg-[#142B45] hover:text-white"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Equipment Cards */}
                <div className="mt-10">

                    {loading ? (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="h-80 animate-pulse rounded-2xl bg-slate-200"
                                />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="rounded-xl bg-white p-12 text-center">
                            <p className="font-semibold text-red-500">
                                {error}
                            </p>
                        </div>
                    ) : equipment.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center">
                            <Search
                                size={40}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-4 text-xl font-bold text-[#142B45]">
                                No Equipment Found
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Try changing your search or filter options.
                            </p>

                            <button
                                onClick={resetFilters}
                                className="mt-6 rounded-lg bg-[#35C77A] px-6 py-3 text-sm font-semibold text-[#142B45] transition hover:bg-[#2db36b]"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                            {equipment.map((item) => {
                                const isFavorite = favoriteIds.includes(
                                    String(item._id)
                                );

                                return (
                                    <div
                                        key={item._id}
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#35C77A]/50 hover:shadow-xl hover:shadow-[#142B45]/10"
                                    >
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden bg-slate-100">

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#142B45] shadow-sm">
                                                {item.category}
                                            </span>

                                            <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#35C77A] px-3 py-1.5 text-xs font-bold text-[#142B45] shadow-sm">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#142B45]" />
                                                {item.isAvailable
                                                    ? "Available"
                                                    : "Unavailable"}
                                            </span>

                                            {/* Favorite Button */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleFavorite(String(item._id))
                                                }
                                                disabled={favoriteLoading.includes(
                                                    String(item._id)
                                                )}
                                                aria-label={
                                                    isFavorite
                                                        ? "Remove from favorites"
                                                        : "Add to favorites"
                                                }
                                                className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Heart
                                                    size={20}
                                                    fill={
                                                        isFavorite
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                    className={
                                                        isFavorite
                                                            ? "text-red-500"
                                                            : "text-slate-500"
                                                    }
                                                />
                                            </button>

                                            <Link
                                                href={`/equipment/${item._id}`}
                                                aria-label={`View ${item.name}`}
                                                className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-[#142B45] opacity-0 shadow-lg transition-all duration-300 hover:bg-[#35C77A] group-hover:translate-y-0 group-hover:opacity-100"
                                            >
                                                <ArrowUpRight size={20} />
                                            </Link>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-5">

                                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                                <MapPin
                                                    size={15}
                                                    className="text-[#35C77A]"
                                                />
                                                {item.location}
                                            </div>

                                            <h3 className="mt-3 line-clamp-1 text-xl font-bold text-[#142B45] transition-colors group-hover:text-[#229c5b]">
                                                {item.name}
                                            </h3>

                                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                                <div>
                                                    <p className="text-xs font-medium text-slate-400">
                                                        Rental Price
                                                    </p>

                                                    <div className="mt-1 flex items-baseline gap-1">
                                                        <span className="text-2xl font-extrabold text-[#142B45]">
                                                            ৳{Number(item.price).toLocaleString("en-BD")}
                                                        </span>

                                                        <span className="text-xs text-slate-500">
                                                            / {item.rentalType}
                                                        </span>
                                                    </div>
                                                </div>

                                                <Link
                                                    href={`/equipment/${item._id}`}
                                                    className="inline-flex items-center gap-2 rounded-lg bg-[#142B45] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#35C77A] hover:text-[#142B45]"
                                                >
                                                    Details
                                                    <ArrowRight size={15} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
