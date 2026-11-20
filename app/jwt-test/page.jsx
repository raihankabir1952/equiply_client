
"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function JWTTestPage() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const testJWT = async () => {
        try {
            setLoading(true);

            const response = await apiFetch("/jwt-test");
            const data = await response.json();

            setResult({
                status: response.status,
                data,
            });
        } catch (error) {
            setResult({
                error: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-5">
            <h1 className="text-2xl font-bold">JWT Authentication Test</h1>

            <button
                onClick={testJWT}
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white"
            >
                {loading ? "Testing..." : "Test JWT"}
            </button>

            {result && (
                <pre className="max-w-xl overflow-auto rounded-lg bg-gray-100 p-5 text-black">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}
