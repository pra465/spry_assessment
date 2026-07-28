import { memo } from 'react';
import HeartIcon from '../assets/heart.svg?react';
import type { Product } from '../types';

type ProductCardProps = {
    product: Product;
    isFavorite?: boolean;
    onToggleFavorite?: (id: string) => void;
};

const Stars = ({ filled }: { filled: number }) => (
    <span aria-hidden="true" className="text-xs leading-none text-[#E8A33D]">
        {"★".repeat(filled)}
        <span className="text-[#DCDBD5]">{"☆".repeat(5 - filled)}</span>
    </span>
);

const ProductCard = ({ product, isFavorite = false, onToggleFavorite }: ProductCardProps) => {
    const { id, name, price, category, rating, image } = product;

    return (
        <article
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#E6E5E0] bg-white transition-shadow duration-200 hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
        >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F2F1ED]">
                <img
                    src={image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />

                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#3A3A35]">
                    {category}
                </span>

                <button
                    type="button"
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
                    onClick={() => onToggleFavorite?.(id)}
                    className={`absolute right-3 top-3 grid h-[34px] w-[34px] place-items-center rounded-full bg-white/90 shadow-sm transition-colors after:absolute after:-inset-[7px] after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9613C] focus-visible:ring-offset-2 ${isFavorite
                            ? "text-[#D9613C]"
                            : "text-[#B7B7B0] hover:text-[#D9613C]"
                        }`}
                >
                    <HeartIcon aria-hidden="true" className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-3.5 pb-4">
                <h3 className="line-clamp-2 text-sm font-medium leading-5 text-[#14161A]">
                    {name}
                </h3>

                <div className="flex items-center gap-1.5">
                    <Stars filled={Math.round(rating)} />
                    <span className="text-xs tabular-nums text-[#8A8A82]">
                        {rating.toFixed(1)}
                    </span>
                </div>

                <p className="mt-auto text-base font-semibold tracking-[-0.02em] text-[#14161A]">
                    ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
        </article>
    );
};

export default memo(ProductCard);