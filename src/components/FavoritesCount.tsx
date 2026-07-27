import HeartIcon from '../assets/heart.svg?react';

type FavoritesCountProps = {
    count: number
}

const FavoritesCount = ({ count }: FavoritesCountProps) => {
    return (
        <div
            aria-live="polite"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#14161A]
               px-3 py-1.5 text-xs font-semibold text-white
               sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[13px]"
        >
            <HeartIcon
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-[#FF6B6B] sm:h-4 sm:w-4"
            />
            <span className="hidden sm:inline">Favorites</span>
            <span aria-hidden="true" className="hidden text-white/40 sm:inline">·</span>
            <span className="tabular-nums">{count}</span>
            <span className="sr-only"> favorites</span>
        </div>
    )
}

export default FavoritesCount;