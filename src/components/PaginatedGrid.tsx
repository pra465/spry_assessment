import { useEffect, useState } from 'react'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination'
import type { Product } from '../types'

const PAGE_SIZE = 12 // divisible by 3 and 4 → clean rows at every column count

type PaginatedGridProps = {
    products: Product[]
    favourites: Set<string>
    onToggleFavorite: (id: string) => void
}

/** Desktop results: classic page-based pagination over the sorted list. */
const PaginatedGrid = ({ products, favourites, onToggleFavorite }: PaginatedGridProps) => {
    const [page, setPage] = useState(1)
    const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE))

    // The result set changed (new filter/sort) — jump back to the first page.
    useEffect(() => {
        setPage(1)
    }, [products])

    // Guard against a stale page if totalPages shrank between renders.
    const current = Math.min(page, totalPages)
    const start = (current - 1) * PAGE_SIZE
    const pageItems = products.slice(start, start + PAGE_SIZE)

    const goTo = (next: number) => {
        setPage(next)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <ProductGrid
                products={pageItems}
                favourites={favourites}
                onToggleFavorite={onToggleFavorite}
            />
            {totalPages > 1 && (
                <Pagination page={current} totalPages={totalPages} onChange={goTo} />
            )}
        </>
    )
}

export default PaginatedGrid
