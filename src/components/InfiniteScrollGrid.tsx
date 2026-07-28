import { useEffect, useRef, useState } from 'react'
import ProductGrid from './ProductGrid'
import type { Product } from '../types'

const BATCH = 12

type InfiniteScrollGridProps = {
    products: Product[]
    favourites: Set<string>
    onToggleFavorite: (id: string) => void
}

const InfiniteScrollGrid = ({ products, favourites, onToggleFavorite }: InfiniteScrollGridProps) => {
    const [visibleCount, setVisibleCount] = useState(BATCH)
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setVisibleCount(BATCH)
    }, [products])

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
