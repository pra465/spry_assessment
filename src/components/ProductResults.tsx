import PaginatedGrid from './PaginatedGrid'
import InfiniteScrollGrid from './InfiniteScrollGrid'
import { useMediaQuery } from '../hooks/useMediaQuery'
import type { Product } from '../types'

const DESKTOP_QUERY = '(min-width: 1024px)'

type ProductResultsProps = {
    products: Product[]
    favourites: Set<string>
    onToggleFavorite: (id: string) => void
}

const ProductResults = (props: ProductResultsProps) => {
    const isDesktop = useMediaQuery(DESKTOP_QUERY)
    return isDesktop ? <PaginatedGrid {...props} /> : <InfiniteScrollGrid {...props} />
}

export default ProductResults
