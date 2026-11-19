
"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
    ArrowLeft,
    MapPin,
    Package,
    CalendarDays,
    ShieldCheck,
    Clock,
} from "lucide-react";

function EquipmentDetailsContent() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.replace("/login");
            return;
        }

        const fetchEquipment = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/equipment/${id}`,
                    {
                        credentials: "include",
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to fetch equipment!"
                    );
                }

                setEquipment(data.equipment);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipment();
    }, [id, session, isPending, router]);

    if (isPending || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg font-medium text-[#142B45]">
                    Loading equipment details...
                </p>
            </div>
        );
    }

    if (!session) return null;

    if (error || !equipment) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
                <Package size={48} className="text-slate-300" />

                <h2 className="mt-4 text-2xl font-bold text-[#142B45]">
                    Equipment Not Found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    {error || "This equipment is not available."}
                </p>

                <Link
                    href="/equipment"
                    className="mt-6 rounded-lg bg-[#35C77A] px-6 py-3 font-semibold text-[#142B45]"
                >
                    Back to Equipment
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-12">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">

                {/* Back Button */}
                <Link
                    href="/equipment"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#142B45] transition hover:text-[#229c5b]"
                >
                    <ArrowLeft size={18} />
                    Back to Equipment
                </Link>

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* Equipment Image */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="h-[350px] sm:h-[480px]">
                            <img
                                src={equipment.image}
                                alt={equipment.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Equipment Information */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                        <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                            {equipment.category}
                        </span>

                        <h1 className="mt-5 text-3xl font-extrabold text-[#142B45] sm:text-4xl">
                            {equipment.name}
                        </h1>

                        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                            <MapPin size={18} className="text-[#35C77A]" />
                            {equipment.location}
                        </div>

                        {/* Price */}
                        <div className="mt-8 rounded-xl bg-slate-50 p-5">
                            <p className="text-sm font-medium text-slate-500">
                                Rental Price
                            </p>

                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-3xl font-extrabold text-[#142B45]">
                                    ৳{Number(equipment.price).toLocaleString("en-BD")}
                                </span>

                                <span className="text-sm text-slate-500">
                                    / {equipment.rentalType}
                                </span>
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="mt-6 grid grid-cols-2 gap-4">

                            <div className="rounded-xl border border-slate-100 p-4">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Package size={17} className="text-[#35C77A]" />
                                    Availability
                                </div>

                                <p className="mt-2 font-bold text-[#142B45]">
                                    {equipment.availableQuantity > 0
                                        ? "Available"
                                        : "Unavailable"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-100 p-4">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Clock size={17} className="text-[#35C77A]" />
                                    Quantity
                                </div>

                                <p className="mt-2 font-bold text-[#142B45]">
                                    {equipment.availableQuantity}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-8">
                            <h2 className="text-lg font-bold text-[#142B45]">
                                Description
                            </h2>

                            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                                {equipment.description || "No description available."}
                            </p>
                        </div>

                        {/* Terms */}
                        <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-4">
                            <div className="flex items-center gap-2 font-semibold text-[#142B45]">
                                <ShieldCheck size={19} className="text-[#229c5b]" />
                                Terms & Conditions
                            </div>

                            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                                {equipment.termsAndConditions || "No additional terms available."}
                            </p>
                        </div>

                        {/* Booking Button */}
                        <button
                            disabled={equipment.availableQuantity <= 0}
                            onClick={() => router.push(`/equipment/${id}/book`)}
                            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#35C77A] px-6 py-4 font-bold text-[#142B45] transition hover:bg-[#2db36b] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <CalendarDays size={19} />
                            {equipment.availableQuantity > 0
                                ? "Rent Now"
                                : "Currently Unavailable"}
                        </button>

                    </div>
                </div>
            </div>
        </main>
        
    );
    
}
export default function EquipmentDetailsPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    Loading equipment details...
                </div>
            }
        >
            <EquipmentDetailsContent />
        </Suspense>
    );
}
