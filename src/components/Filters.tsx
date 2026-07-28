import { useMemo, useState } from 'react'
import type { Product } from '../types'
import { useFilters } from '../context/FiltersContext'

const RATING_OPTIONS = [0, 2, 3, 4]

const Stars = ({ filled }: { filled: number }) => (
    <span aria-hidden="true" className="text-[13px] leading-none text-[#E8A33D]">
        {"★".repeat(filled)}
        <span className="text-[#DCDBD5]">{"☆".repeat(5 - filled)}</span>
    </span>
)

type FiltersProps = {
    products: Product[]
}

const Filters = ({ products }: FiltersProps) => {
    const { categories: selected, minRating, toggleCategory, setMinRating } = useFilters()
    const [isOpen, setIsOpen] = useState(false)

    const categoryCounts = useMemo(() => {
        const counts = new Map<string, number>()
        for (const product of products) {
            counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
        }
        return [...counts.entries()]
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => a.category.localeCompare(b.category))
    }, [products])

    return (
        <aside className="w-full lg:sticky lg:top-6 lg:w-[264px] lg:shrink-0 lg:self-start">
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                aria-controls="filters-panel"
                className="flex w-full items-center justify-between rounded-xl border border-[#E6E5E0] bg-white px-4 py-3 text-sm font-semibold text-[#14161A] lg:hidden"
            >
                <span>Filters</span>
                <span aria-hidden="true" className="text-lg leading-none text-[#6E6E68]">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            <div
                id="filters-panel"
                className={`${isOpen ? "block" : "hidden"} mt-3 rounded-2xl border border-[#E6E5E0] bg-white p-5 lg:mt-0 lg:block`}
            >
                <h2 className="hidden text-base font-semibold tracking-[-0.01em] text-[#14161A] lg:block">
                    Filters
                </h2>

                <fieldset className="border-b border-[#E6E5E0] pb-6 lg:mt-6">
                    <legend className="text-[11px] font-semibold tracking-[0.08em] text-[#8A8A82]">
                        CATEGORY
                    </legend>
                    <div className="mt-3.5 flex max-h-[280px] flex-col gap-3 overflow-y-auto pr-1">
                        {categoryCounts.map(({ category, count }) => (
                            <label
                                key={category}
                                className="flex cursor-pointer items-center gap-2.5 text-[13px]"
                            >
                                <input
                                    type="checkbox"
                                    className="h-[18px] w-[18px] shrink-0 cursor-pointer rounded accent-[#14161A]"
                                    checked={selected.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                />
                                <span className="flex-1 text-[#4A4A45]">{category}</span>
                                <span className="tabular-nums text-[#A6A6A0]">{count}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="mt-6">
                    <legend className="text-[11px] font-semibold tracking-[0.08em] text-[#8A8A82]">
                        MINIMUM RATING
                    </legend>
                    <div className="mt-3.5 flex flex-col gap-3.5">
                        {RATING_OPTIONS.map((rating) => (
                            <label
                                key={rating}
                                className="flex cursor-pointer items-center gap-2.5 text-[13px]"
                            >
                                <input
                                    type="radio"
                                    name="minRating"
                                    className="h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#14161A]"
                                    checked={minRating === rating}
                                    onChange={() => setMinRating(rating)}
                                />
                                {rating === 0 ? (
                                    <span className="text-[#4A4A45]">Any rating</span>
                                ) : (
                                    <>
                                        <Stars filled={rating} />
                                        <span className="text-[#6E6E68]">&amp; up</span>
                                    </>
                                )}
                            </label>
                        ))}
                    </div>
                </fieldset>
            </div>
        </aside>
    )
}

export default Filters
