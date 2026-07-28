import ProductCard from './ProductCard'
import { PRODUCT_GRID_CLASS } from './gridLayout'
import type { Product } from '../types'

type ProductGridProps = {
    products: Product[]
    favourites: Set<string>
    onToggleFavorite: (id: string) => void
}

const ProductGrid = ({ products, favourites, onToggleFavorite }: ProductGridProps) => {
    return (
        <div className={PRODUCT_GRID_CLASS}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favourites.has(product.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    )
}

export default ProductGrid
