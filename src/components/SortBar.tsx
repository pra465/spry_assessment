import { useFilters } from '../context/FiltersContext'
import type { SortOrder } from '../types'

type SortBarProps = {
    count: number
}

const OPTIONS: { value: SortOrder; label: string }[] = [
    { value: 'asc', label: 'Low → High' },
    { value: 'desc', label: 'High → Low' },
]

const SortBar = ({ count }: SortBarProps) => {
    const { sortOrder, setSortOrder } = useFilters()

    return (
        <div className="sticky top-0 z-20 mb-4 flex items-center justify-between gap-3 rounded-xl border border-[#E6E5E0] bg-white/85 px-3 py-2.5 backdrop-blur sm:px-4">
            <p className="text-sm font-medium">
                <span className="tabular-nums text-[#14161A]">{count}</span>{" "}
                <span className="text-[#6E6E68]">{count === 1 ? "product" : "products"}</span>
            </p>

            <div
                role="group"
                aria-label="Sort by price"
                className="flex items-center gap-1 rounded-lg bg-[#F2F1ED] p-1"
            >
                {OPTIONS.map((option) => {
                    const isActive = sortOrder === option.value
                    return (
                        <button
                            key={option.value}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setSortOrder(option.value)}
                            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${isActive
                                    ? "bg-[#14161A] text-white"
                                    : "text-[#6E6E68] hover:text-[#14161A]"
                                }`}
                        >
                            {option.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SortBar
