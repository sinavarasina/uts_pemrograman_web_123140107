import { useState, useEffect, useCallback } from "react";

export default function useFetch(fetchFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retry, setRetry] = useState(0);

    const refetch = useCallback(() => {
        setRetry((r) => r + 1);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        let cancelled = false;

        async function run() {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchFn({ signal: controller.signal });
                if (!cancelled) setData(result);
            } catch (err) {
                if (!cancelled) {
                    setError({
                        message:
                            err.response?.data?.message ||
                            err.message ||
                            "Terjadi kesalahan",
                        status: err.response?.status || 0,
                    });
                    setData(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();
        return () => {
            cancelled = true;
            controller.abort();
        };
    }, [...deps, retry]);

    return { data, loading, error, refetch };
}

