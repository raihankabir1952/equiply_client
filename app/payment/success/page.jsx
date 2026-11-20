
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function PaymentSuccessPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const sessionId = params.get("session_id");

                if (!sessionId) {
                    throw new Error("Payment session ID not found!");
                }

                const res = await apiFetch(
                    `/payments/verify-session/${sessionId}`
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.message || "Payment verification failed!"
                    );
                }

                setPaymentStatus(data.paymentStatus);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, []);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <Loader2
                        size={40}
                        className="mx-auto animate-spin text-[#35C77A]"
                    />
                    <p className="mt-4 font-semibold text-[#142B45]">
                        Verifying your payment...
                    </p>
                </div>
            </main>
        );
    }

    const isPaid = paymentStatus === "paid";

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                {isPaid ? (
                    <CheckCircle2
                        size={75}
                        className="mx-auto text-[#35C77A]"
                    />
                ) : (
                    <AlertCircle
                        size={75}
                        className="mx-auto text-amber-500"
                    />
                )}

                <h1 className="mt-6 text-3xl font-extrabold text-[#142B45]">
                    {isPaid
                        ? "Payment Successful!"
                        : "Payment Not Completed"}
                </h1>

                <p className="mt-3 text-slate-500">
                    {isPaid
                        ? "Your payment has been received successfully. Your rental booking is being confirmed."
                        : error || "Your payment has not been confirmed yet."}
                </p>

                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-500">
                        Payment Status
                    </p>

                    <p
                        className={`mt-1 text-xl font-bold ${
                            isPaid ? "text-green-700" : "text-amber-600"
                        }`}
                    >
                        {isPaid ? "PAID" : "NOT CONFIRMED"}
                    </p>
                </div>

                <Link
                    href="/dashboard/customer/rentals"
                    className="mt-7 inline-flex w-full justify-center rounded-xl bg-[#35C77A] px-6 py-3 font-bold text-[#142B45] transition hover:bg-[#2db36b]"
                >
                    View My Rentals
                </Link>

                <Link
                    href="/"
                    className="mt-4 inline-block text-sm font-semibold text-slate-500 hover:text-[#142B45]"
                >
                    Back to Home
                </Link>

            </div>
        </main>
    );
}
