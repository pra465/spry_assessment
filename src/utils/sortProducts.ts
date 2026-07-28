import type { Product, SortOrder } from '../types';

export function sortProducts(products: Product[], order: SortOrder): Product[] {
    return [...products].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price,
    );
}
