"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "better-auth/api";
import { LogIn, LogOut } from "lucide-react";

export default function CustomerDashboard() {
    const router = useRouter();

    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "customer") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    const handleLogout = async () => {
        await signOut();
        router.replace("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <h1 className="text-2xl font-bold text-[#142B45]">
                Welcome, {session.user.name}!
            </h1>
        </div>
    );
}