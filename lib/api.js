const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch API with JWT authentication
export const apiFetch = async (endpoint, options = {}) => {
    // Get JWT access token
    const tokenResponse = await fetch(`${API_URL}/auth/token`, {
        credentials: "include",
    });

    if (!tokenResponse.ok) {
        throw new Error("Authentication required! Please login.");
    }

    const { token } = await tokenResponse.json();

    // Send API request with JWT
    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });
};