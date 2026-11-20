
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentCancelPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                <XCircle
                    size={75}
                    className="mx-auto text-red-500"
                />

                <h1 className="mt-6 text-3xl font-extrabold text-[#142B45]">
                    Payment Cancelled!
                </h1>

                <p className="mt-3 text-slate-500">
                    Your payment was not completed.
                    You can return to your rentals and try again.
                </p>

                <div className="mt-6 rounded-xl bg-red-50 p-4">
                    <p className="text-sm font-semibold text-red-600">
                        Payment Status
                    </p>
                    <p className="mt-1 text-xl font-bold text-red-600">
                        UNPAID
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
