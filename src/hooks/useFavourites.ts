import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'favourites';

function readInitialFavourites(): Set<string> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return new Set();
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? new Set(parsed as string[]) : new Set();
    } catch {
        return new Set();
    }
}

export function useFavourites() {
    const [favourites, setFavourites] = useState<Set<string>>(readInitialFavourites);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...favourites]));
    }, [favourites]);

    const toggleFavourite = useCallback((id: string) => {
        setFavourites((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }, []);

    return { favourites, toggleFavourite };
}
