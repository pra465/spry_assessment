import { PRODUCT_GRID_CLASS } from './gridLayout'

const SKELETON_COUNT = 8

const GridSkeleton = () => {
    return (
        <div className={PRODUCT_GRID_CLASS} aria-hidden="true">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-[#E6E5E0] bg-white"
                >
                    <div className="aspect-[4/5] w-full animate-pulse bg-[#EDECE7]" />
                    <div className="flex flex-col gap-2 p-3.5 pb-4">
                        <div className="h-3.5 w-4/5 animate-pulse rounded bg-[#EDECE7]" />
                        <div className="h-3 w-1/3 animate-pulse rounded bg-[#EDECE7]" />
                        <div className="mt-1 h-4 w-1/4 animate-pulse rounded bg-[#EDECE7]" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GridSkeleton
