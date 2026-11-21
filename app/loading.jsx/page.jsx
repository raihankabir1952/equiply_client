
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
                    <Loader2
                        size={35}
                        className="animate-spin text-[#35C77A]"
                    />
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#142B45]">
                    Loading Equiply...
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Please wait while we prepare everything for you.
                </p>
            </div>
        </div>
    );
}
