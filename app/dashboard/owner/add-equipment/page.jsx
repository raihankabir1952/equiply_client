
"use client";
import { Upload, Package, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AddEquipmentPage() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }

        if (!isPending && session && session.user.role !== "owner") {
            router.replace("/");
        }
    }, [session, isPending, router]);

    if (isPending || !session) {
        return <p>Loading...</p>;
    }


    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#142B45]">
                    Add Equipment
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    List your equipment and make it available for rent.
                </p>
            </div>

            <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
            >

                {/* Basic Information */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#142B45]">
                        Basic Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Provide basic details about your equipment.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Equipment Name */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Equipment Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter equipment name"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Category
                            </label>
                            <select
                                defaultValue=""
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Construction">Construction</option>
                                <option value="Photography">Photography</option>
                                <option value="Vehicles & Transportation">Vehicles & Transportation</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Event Equipment">Event Equipment</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Location
                            </label>
                            <input
                                type="text"
                                placeholder="Enter equipment location"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Describe your equipment..."
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            />
                        </div>

                        {/* Equipment Image */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Equipment Image
                            </label>

                            <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-[#35C77A]">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                                    <Upload className="h-6 w-6 text-[#35C77A]" />
                                </div>

                                <p className="mt-4 text-sm font-semibold text-[#142B45]">
                                    Upload equipment image
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    PNG, JPG or WEBP (Max 5MB)
                                </p>

                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#142B45] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#1d3d5e]"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Rental Information */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#142B45]">
                        Rental Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Set your equipment rental price and availability.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Rental Price */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Rental Price (৳)
                            </label>
                            <input
                                type="number"
                                min="1"
                                placeholder="Enter rental price"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            />
                        </div>

                        {/* Rental Type */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Rental Type
                            </label>
                            <select
                                defaultValue=""
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            >
                                <option value="" disabled>Select rental type</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        {/* Available Quantity */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Available Quantity
                            </label>
                            <input
                                type="number"
                                min="1"
                                placeholder="Enter available quantity"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            />
                        </div>

                    </div>
                </div>

                {/* Equipment Details */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#142B45]">
                        Equipment Details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Add more information about your equipment.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Equipment Condition */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Equipment Condition
                            </label>
                            <select
                                defaultValue=""
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            >
                                <option value="" disabled>Select condition</option>
                                <option value="New">New</option>
                                <option value="Like New">Like New</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>

                        {/* Brand */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Brand
                            </label>
                            <input
                                type="text"
                                placeholder="Enter brand name"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            />
                        </div>

                        {/* Model */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-[#142B45]">
                                Model
                            </label>
                            <input
                                type="text"
                                placeholder="Enter equipment model"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                            />
                        </div>

                    </div>
                </div>

                {/* Rental Terms */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#142B45]">
                        Rental Terms and Conditions
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Specify the terms customers must follow when renting.
                    </p>

                    <div className="mt-6">
                        <textarea
                            rows={5}
                            placeholder="Write rental terms and conditions..."
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#35C77A]"
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#142B45]">
                        Equipment Status
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        All newly submitted equipment requires admin approval.
                    </p>

                    <div className="mt-5">
                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700">
                            Pending Approval
                        </span>
                    </div>
                </div>

                {/* Owner Information */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#142B45]">
                        Owner Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Your account information will be associated with this equipment.
                    </p>

                    <div className="mt-5 flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                        {session.user.image ? (
                            <img
                                src={session.user.image}
                                alt="Owner"
                                className="h-14 w-14 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#142B45] text-xl font-bold text-white">
                                {session.user.name?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <div>
                            <p className="font-semibold text-[#142B45]">
                                {session.user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {session.user.email}
                            </p>
                            <p className="mt-1 text-xs font-medium text-[#35C77A]">
                                Verified Account
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-[#35C77A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2db36b]"
                    >
                        Add Equipment
                    </button>
                </div>

            </form>
        </div>
    );

}
