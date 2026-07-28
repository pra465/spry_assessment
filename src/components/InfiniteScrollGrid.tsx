import { useEffect, useRef, useState } from 'react'
import ProductGrid from './ProductGrid'
import type { Product } from '../types'

const BATCH = 12

type InfiniteScrollGridProps = {
    products: Product[]
    favourites: Set<string>
    onToggleFavorite: (id: string) => void
}

/** Mobile results: reveal an initial batch, then load more as a sentinel below
 *  the grid scrolls into view (IntersectionObserver — no scroll listeners). */
const InfiniteScrollGrid = ({ products, favourites, onToggleFavorite }: InfiniteScrollGridProps) => {
    const [visibleCount, setVisibleCount] = useState(BATCH)
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    // The result set changed (new filter/sort) — start from the first batch.
    useEffect(() => {
        setVisibleCount(BATCH)
    }, [products])

    // Re-arm the observer after each reveal so it keeps loading while the
    // sentinel stays in view (e.g. tall screens), then stops at the end.
    useEffect(() => {
        if (visibleCount >= products.length) return
        const node = sentinelRef.current
        if (!node) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((count) => Math.min(count + BATCH, products.length))
                }
            },
            { rootMargin: '300px' },
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [visibleCount, products])

    const visibleItems = products.slice(0, visibleCount)
    const hasMore = visibleCount < products.length

    return (
        <>
            <ProductGrid
                products={visibleItems}
                favourites={favourites}
                onToggleFavorite={onToggleFavorite}
            />
            {hasMore && <div ref={sentinelRef} aria-hidden="true" className="h-10" />}
        </>
    )
}

export default InfiniteScrollGrid
