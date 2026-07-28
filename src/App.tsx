import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Filters from './components/Filters'
import SortBar from './components/SortBar'
import ProductResults from './components/ProductResults'
import GridSkeleton from './components/GridSkeleton'
import EmptyState from './components/EmptyState'
import ErrorState from './components/ErrorState'
import { fetchProducts } from './api/fetchProducts'
import { filterProducts } from './utils/filterProducts'
import { sortProducts } from './utils/sortProducts'
import { useFilters } from './context/FiltersContext'
import { useFavourites } from './hooks/useFavourites'
import type { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const { categories, minRating, sortOrder } = useFilters()
  const { favourites, toggleFavourite } = useFavourites()

  useEffect(() => {
    let active = true
    setIsLoading(true)
    setError(null)
    fetchProducts()
      .then((data) => {
        if (active) setProducts(data)
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Something went wrong')
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })
    return () => {
      active = false
    }
  }, [reloadKey])

  const filtered = useMemo(
    () => filterProducts(products, { categories, minRating }),
    [products, categories, minRating],
  )
  const sorted = useMemo(() => sortProducts(filtered, sortOrder), [filtered, sortOrder])

  return (
    <div className="min-h-screen bg-[#F7F7F4] text-[#14161A]">
      <Navbar favoritesCount={favourites.size} />
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-10 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <Filters products={products} />
          <main className="min-w-0 flex-1">
            {isLoading ? (
              <GridSkeleton />
            ) : error ? (
              <ErrorState message={error} onRetry={() => setReloadKey((k) => k + 1)} />
            ) : (
              <>
                <SortBar count={sorted.length} />
                {sorted.length === 0 ? (
                  <EmptyState />
                ) : (
                  <ProductResults
                    products={sorted}
                    favourites={favourites}
                    onToggleFavorite={toggleFavourite}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
