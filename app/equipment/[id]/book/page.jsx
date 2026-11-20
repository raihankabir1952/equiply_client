
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import {
    ArrowLeft,
    CalendarDays,
    MapPin,
    Package,
    ShieldCheck,
    Loader2,
    CreditCard,
} from "lucide-react";

export default function BookingPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        quantity: 1,
        contactNumber: "",
        address: "",
        notes: "",
    });

    // Fetch equipment details
    useEffect(() => {
        if (isPending) return;

        if (!session) {
            router.replace("/login");
            return;
        }

        const fetchEquipment = async () => {
            try {
                const res = await apiFetch(`/equipment/${id}`);

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to fetch equipment!"
                    );
                }

                setEquipment(data.equipment);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEquipment();
    }, [id, session, isPending, router]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // Calculate rental days
    const rentalDays =
        formData.startDate && formData.endDate
            ? Math.ceil(
                  (new Date(formData.endDate) -
                      new Date(formData.startDate)) /
                      (1000 * 60 * 60 * 24)
              )
            : 0;

    // Calculate total amount
    const totalAmount =
        equipment && rentalDays > 0
            ? equipment.price *
              rentalDays *
              Number(formData.quantity)
            : 0;

    // Create booking
    const handleBooking = async (e) => {
        e.preventDefault();

        if (!formData.startDate || !formData.endDate) {
            return toast.error("Please select rental dates!");
        }

        if (rentalDays <= 0) {
            return toast.error("End date must be after start date!");
        }

        if (Number(formData.quantity) < 1) {
            return toast.error("Quantity must be at least 1!");
        }

        if (Number(formData.quantity) > equipment.availableQuantity) {
            return toast.error("Requested quantity is not available!");
        }

        if (!formData.contactNumber.trim() || !formData.address.trim()) {
            return toast.error("Please provide contact number and address!");
        }

        setBooking(true);

        try {
            // Create rental
            const rentalRes = await apiFetch("/rentals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    equipmentId: id,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    quantity: Number(formData.quantity),
                    contactNumber: formData.contactNumber,
                    address: formData.address,
                    notes: formData.notes,
                }),
            });

            const rentalData = await rentalRes.json();

            if (!rentalRes.ok) {
                throw new Error(
                    rentalData.message || "Booking failed!"
                );
            }

            toast.success("Booking created successfully!");

            // Create Stripe Checkout Session
            const paymentRes = await apiFetch(
                "/payments/create-checkout-session",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        rentalId: rentalData.rental._id,
                    }),
                }
            );

            const paymentData = await paymentRes.json();

            if (!paymentRes.ok) {
                throw new Error(
                    paymentData.message || "Payment session creation failed!"
                );
            }

            window.location.href = paymentData.url;
        } catch (error) {
            toast.error(error.message);
        } finally {
            setBooking(false);
        }
    };

    if (isPending || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="animate-spin text-[#35C77A]" size={35} />
            </div>
        );
    }

    if (!session) return null;

    if (!equipment) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-[#142B45]">
                    Equipment Not Found
                </h2>
                <Link
                    href="/equipment"
                    className="mt-5 rounded-lg bg-[#35C77A] px-6 py-3 font-semibold text-[#142B45]"
                >
                    Back to Equipment
                </Link>
            </div>
        );
    }

    const today = new Date().toLocaleDateString("en-CA");

    return (
        <main className="min-h-screen bg-slate-50 py-12">
            <div className="mx-auto max-w-6xl px-5 lg:px-8">

                <Link
                    href={`/equipment/${id}`}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#142B45] hover:text-[#229c5b]"
                >
                    <ArrowLeft size={18} />
                    Back to Equipment
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-[#142B45]">
                        Complete Your Booking
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Fill in your rental information to continue.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleBooking}
                            className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-[#142B45]">
                                    Rental Information
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Select your rental dates and quantity.
                                </p>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        min={today}
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                        End Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        min={formData.startDate || today}
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                    Quantity *
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    max={equipment.availableQuantity}
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                />
                                <p className="mt-1 text-xs text-slate-500">
                                    Available quantity: {equipment.availableQuantity}
                                </p>
                            </div>

                            <div className="border-t border-slate-100 pt-6">
                                <h2 className="text-xl font-bold text-[#142B45]">
                                    Contact Information
                                </h2>

                                <div className="mt-5 space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                            Contact Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            placeholder="01XXXXXXXXX"
                                            required
                                            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                            Delivery Address *
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Enter your full address"
                                            required
                                            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-[#142B45]">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Any special instructions? (Optional)"
                                            className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={booking || equipment.availableQuantity <= 0}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#35C77A] px-6 py-4 font-bold text-[#142B45] transition hover:bg-[#2db36b] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {booking ? (
                                    <>
                                        <Loader2 size={19} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard size={19} />
                                        Continue to Payment
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Booking Summary */}
                    <div>
                        <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-[#142B45]">
                                Booking Summary
                            </h2>

                            <img
                                src={equipment.image}
                                alt={equipment.name}
                                className="mt-5 h-44 w-full rounded-xl object-cover"
                            />

                            <h3 className="mt-4 font-bold text-[#142B45]">
                                {equipment.name}
                            </h3>

                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                <MapPin size={15} className="text-[#35C77A]" />
                                {equipment.location}
                            </div>

                            <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm">
                                <div className="flex justify-between gap-3">
                                    <span className="text-slate-500">
                                        Price per {equipment.rentalType}
                                    </span>
                                    <span className="font-semibold text-[#142B45]">
                                        ৳{Number(equipment.price).toLocaleString("en-BD")}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">
                                        Rental Days
                                    </span>
                                    <span className="font-semibold text-[#142B45]">
                                        {rentalDays > 0 ? rentalDays : 0}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-500">
                                        Quantity
                                    </span>
                                    <span className="font-semibold text-[#142B45]">
                                        {formData.quantity}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                                <span className="font-bold text-[#142B45]">
                                    Total Amount
                                </span>
                                <span className="text-2xl font-extrabold text-[#142B45]">
                                    ৳{totalAmount.toLocaleString("en-BD")}
                                </span>
                            </div>

                            <div className="mt-5 rounded-xl bg-green-50 p-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                                    <ShieldCheck size={18} />
                                    Secure Payment
                                </div>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Your booking will be confirmed after successful payment.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
