import type { Product } from '../types';

export type ActiveFilters = {
    categories: string[];
    minRating: number;
};

export function filterProducts(
    products: Product[],
    { categories, minRating }: ActiveFilters,
): Product[] {
    const hasCategoryFilter = categories.length > 0;

    return products.filter((product) => {
        if (hasCategoryFilter && !categories.includes(product.category)) return false;
        if (product.rating < minRating) return false;
        return true;
    });
}
