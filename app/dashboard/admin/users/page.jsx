
"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ShieldCheck, Users, UserCog } from "lucide-react";

const usersData = [
    {
        id: 1,
        name: "Tanvir Ahmed",
        email: "tanvir@example.com",
        role: "customer",
        joined: "Nov 10, 2026",
    },
    {
        id: 2,
        name: "Nusrat Jahan",
        email: "nusrat@example.com",
        role: "owner",
        joined: "Nov 12, 2026",
    },
    {
        id: 3,
        name: "Arif Hossain",
        email: "arif@example.com",
        role: "admin",
        joined: "Nov 14, 2026",
    },
    {
        id: 4,
        name: "Sadia Rahman",
        email: "sadia@example.com",
        role: "customer",
        joined: "Nov 16, 2026",
    },
];

export default function AllUsersPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    All Users
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Manage all registered users and their account roles.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3">
                            <Users className="text-blue-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {usersData.length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-50 p-3">
                            <UserCog className="text-[#35C77A]" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Owners</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {usersData.filter((user) => user.role === "owner").length}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-3">
                            <ShieldCheck className="text-purple-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Admins</p>
                            <h3 className="text-2xl font-bold text-[#142B45]">
                                {usersData.filter((user) => user.role === "admin").length}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

                <div className="border-b border-gray-100 px-6 py-5">
                    <h2 className="font-semibold text-[#142B45]">
                        Registered Users
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        View and manage user accounts.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">

                        <thead className="bg-gray-50">
                            <tr className="text-sm text-gray-600">
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Registration Date</th>
                                <th className="px-6 py-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {usersData.map((user) => (
                                <tr key={user.id} className="text-sm transition hover:bg-gray-50">

                                    <td className="px-6 py-4 font-semibold text-[#142B45]">
                                        {user.name}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                            user.role === "admin"
                                                ? "bg-purple-50 text-purple-700"
                                                : user.role === "owner"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-blue-50 text-blue-700"
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                        {user.joined}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">

                                            <select
                                                defaultValue={user.role}
                                                className="rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#35C77A]"
                                            >
                                                <option value="customer">Customer</option>
                                                <option value="owner">Owner</option>
                                                <option value="admin">Admin</option>
                                            </select>

                                            <button
                                                type="button"
                                                title="Manage User"
                                                className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-[#142B45] transition hover:bg-gray-200"
                                            >
                                                Manage
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className="border-t border-gray-100 px-6 py-4">
                    <p className="text-sm text-gray-500">
                        Showing {usersData.length} users
                    </p>
                </div>

            </div>

        </div>
    );
}
