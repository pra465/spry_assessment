import { useFilters } from '../context/FiltersContext'

const EmptyState = () => {
    const { clearAll } = useFilters()

    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E6E5E0] bg-white/60 px-6 py-16 text-center">
            <p className="text-base font-semibold text-[#14161A]">
                No products match your filters
            </p>
            <p className="mt-1.5 max-w-xs text-sm text-[#6E6E68]">
                Try removing a category or lowering the minimum rating.
            </p>
            <button
                type="button"
                onClick={clearAll}
                className="mt-5 rounded-lg bg-[#14161A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2A2D33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14161A] focus-visible:ring-offset-2"
            >
                Clear all filters
            </button>
        </div>
    )
}

export default EmptyState
