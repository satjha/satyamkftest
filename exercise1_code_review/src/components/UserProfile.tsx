import { useState, useEffect } from 'react';
import { getApiUrl } from '../config';

type User = {
    name: string;
    bio?: string;
    email?: string;[
    key: string]: unknown; // allow extra fields from API 
};

type Props = {
    userId: number;
};

function UserProfile({ userId }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryKey, setRetryKey] = useState(0); // trigger retries

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true); setError(null);

        const apiUrl = getApiUrl();
        fetch(`${apiUrl}/users/${userId}`, { signal: controller.signal })
            .then(response => {
                if (!response.ok) throw new Error("Network error");
                return response.json();
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                if (err.name !== "AbortError") {
                    setError("Error loading user. Please try again later.");
                    console.error("Fetch user failed:", err);
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [userId, retryKey]);

    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => setRetryKey(prev => prev + 1)}>
                    Retry
                </button>
            </div>
        );
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1>{user?.name}</h1>
            <p>{user?.bio || user?.email || 'No bio available'}</p>
        </div>
    );
}

export default UserProfile;
