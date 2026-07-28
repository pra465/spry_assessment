import type { Product } from '../types';

const ENDPOINT =
    'https://dummyjson.com/products?limit=0&select=title,price,category,rating,thumbnail';

type DummyJsonProduct = {
    id: number;
    title: string;
    price: number;
    category: string;
    rating: number;
    thumbnail: string;
};

type DummyJsonResponse = {
    products: DummyJsonProduct[];
    total: number;
    skip: number;
    limit: number;
};

function formatCategory(slug: string): string {
    return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function normalize(raw: DummyJsonProduct): Product {
    return {
        id: String(raw.id),
        name: raw.title,
        price: raw.price,
        category: formatCategory(raw.category),
        rating: raw.rating,
        image: raw.thumbnail,
    };
}

/**
 * Fetches the product catalog from the dummyjson API and normalizes it into
 * our internal Product shape. This adapter is the single seam between the API
 * and the UI — the rest of the app never sees the raw API response.
 *
 * Throws on a failed request (non-OK status, network error). The caller owns
 * the loading/error UI.
 */
export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(ENDPOINT);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const data: DummyJsonResponse = await res.json();
    return data.products.map(normalize);
}
