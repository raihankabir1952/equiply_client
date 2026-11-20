
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import {
    ShieldCheck,
    Users,
    UserCog,
    Search,
} from "lucide-react";
import { toast } from "sonner";

export default function AllUsersPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const [users, setUsers] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState("");

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "admin") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    // Fetch All Users
    useEffect(() => {
        if (!session || session.user.role !== "admin") return;

        const fetchUsers = async () => {
            try {
                const res = await apiFetch("/users");

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch users!");
                }

                setUsers(data.users || []);

                const roles = {};

                (data.users || []).forEach((user) => {
                    roles[user._id] = user.role;
                });

                setSelectedRoles(roles);
            } catch (error) {
                console.error("Fetch users error:", error);
                toast.error(error.message || "Failed to fetch users!");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [session]);

    // Handle Role Selection
    const handleRoleChange = (userId, role) => {
        setSelectedRoles((prev) => ({
            ...prev,
            [userId]: role,
        }));
    };

    // Update User Role
    const handleUpdateRole = async (user) => {
        const newRole = selectedRoles[user._id];

        if (newRole === user.role) {
            toast.info("No changes made!");
            return;
        }

        if (user._id === session.user.id) {
            toast.error("You cannot change your own role!");
            return;
        }

        try {
            setUpdating(user._id);

            const res = await apiFetch(`/users/${user._id}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: newRole,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update user role!");
            }

            setUsers((prev) =>
                prev.map((item) =>
                    item._id === user._id
                        ? { ...item, role: newRole }
                        : item
                )
            );

            toast.success("User role updated successfully!");
        } catch (error) {
            console.error("Update user role error:", error);
            toast.error(error.message || "Failed to update user role!");
        } finally {
            setUpdating("");
        }
    };

    if (isPending || !session || loading) {
        return <p>Loading...</p>;
    }

    // Summary Counts
    const owners = users.filter((user) => user.role === "owner").length;
    const admins = users.filter((user) => user.role === "admin").length;

    // Search and Role Filter
    const filteredUsers = users.filter((user) => {
        const searchMatch =
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase());

        const roleMatch =
            roleFilter === "all" || user.role === roleFilter;

        return searchMatch && roleMatch;
    });

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
                                {users.length}
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
                                {owners}
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
                                {admins}
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

                    {/* Search and Filter */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#35C77A]"
                            />
                        </div>

                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#35C77A]"
                        >
                            <option value="all">All Roles</option>
                            <option value="customer">Customer</option>
                            <option value="owner">Owner</option>
                            <option value="admin">Admin</option>
                        </select>

                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">

                        <thead className="bg-gray-50">
                            <tr className="text-sm text-gray-600">
                                <th className="px-6 py-4 font-semibold">User</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Registration Date</th>
                                <th className="px-6 py-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => {
                                    const isCurrentUser =
                                        user._id === session.user.id;

                                    return (
                                        <tr
                                            key={user._id}
                                            className="text-sm transition hover:bg-gray-50"
                                        >

                                            {/* User Avatar and Name */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">

                                                    {user.image ? (
                                                        <img
                                                            src={user.image}
                                                            alt={user.name}
                                                            className="h-11 w-11 rounded-full border border-gray-100 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#142B45] text-sm font-bold uppercase text-white">
                                                            {user.name?.charAt(0) || "U"}
                                                        </div>
                                                    )}

                                                    <div>
                                                        <p className="font-semibold text-[#142B45]">
                                                            {user.name}

                                                            {isCurrentUser && (
                                                                <span className="ml-2 text-xs font-normal text-gray-400">
                                                                    (You)
                                                                </span>
                                                            )}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            {user.phoneNumber || "No phone number"}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="px-6 py-4 text-gray-600">
                                                {user.email}
                                            </td>

                                            {/* Role */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                        user.role === "admin"
                                                            ? "bg-purple-50 text-purple-700"
                                                            : user.role === "owner"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-blue-50 text-blue-700"
                                                    }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>

                                            {/* Registration Date */}
                                            <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                                                {user.createdAt
                                                    ? new Date(user.createdAt).toLocaleDateString(
                                                          "en-US",
                                                          {
                                                              month: "short",
                                                              day: "numeric",
                                                              year: "numeric",
                                                          }
                                                      )
                                                    : "N/A"}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">

                                                    <select
                                                        value={
                                                            selectedRoles[user._id] ||
                                                            user.role
                                                        }
                                                        disabled={
                                                            isCurrentUser ||
                                                            updating === user._id
                                                        }
                                                        onChange={(e) =>
                                                            handleRoleChange(
                                                                user._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-[#35C77A] disabled:cursor-not-allowed disabled:bg-gray-50"
                                                    >
                                                        <option value="customer">
                                                            Customer
                                                        </option>

                                                        <option value="owner">
                                                            Owner
                                                        </option>

                                                        <option value="admin">
                                                            Admin
                                                        </option>
                                                    </select>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleUpdateRole(user)
                                                        }
                                                        disabled={
                                                            isCurrentUser ||
                                                            updating === user._id ||
                                                            selectedRoles[user._id] === user.role
                                                        }
                                                        className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-[#142B45] transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {updating === user._id
                                                            ? "Updating..."
                                                            : "Manage"}
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-10 text-center text-sm text-gray-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-6 py-4">
                    <p className="text-sm text-gray-500">
                        Showing {filteredUsers.length} of {users.length} users
                    </p>
                </div>

            </div>

        </div>
    );
}
