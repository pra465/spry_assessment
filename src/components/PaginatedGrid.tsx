import { useEffect, useState } from 'react'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination'
import type { Product } from '../types'

const PAGE_SIZE = 12

type PaginatedGridProps = {
    products: Product[]
    favourites: Set<string>
    onToggleFavorite: (id: string) => void
}

const PaginatedGrid = ({ products, favourites, onToggleFavorite }: PaginatedGridProps) => {
    const [page, setPage] = useState(1)
    const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE))

    useEffect(() => {
        setPage(1)
    }, [products])

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
