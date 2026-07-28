type PaginationProps = {
    page: number
    totalPages: number
    onChange: (page: number) => void
}

function getPageItems(page: number, total: number): (number | 'ellipsis')[] {
    const items: (number | 'ellipsis')[] = []
    const left = Math.max(2, page - 1)
    const right = Math.min(total - 1, page + 1)

    items.push(1)
    if (left > 2) items.push('ellipsis')
    for (let p = left; p <= right; p++) items.push(p)
    if (right < total - 1) items.push('ellipsis')
    if (total > 1) items.push(total)

    return items
}

const baseBtn =
    'grid h-9 min-w-9 place-items-center rounded-lg border px-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14161A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40'

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
    const items = getPageItems(page, totalPages)

    return (
        <nav
            aria-label="Pagination"
            className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
        >
            <button
                type="button"
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
                className={`${baseBtn} border-[#E6E5E0] bg-white text-[#14161A] hover:enabled:border-[#D6D5CF]`}
            >
                ‹
            </button>

            {items.map((item, index) =>
                item === 'ellipsis' ? (
                    <span
                        key={`ellipsis-${index}`}
                        aria-hidden="true"
                        className="grid h-9 min-w-9 place-items-center text-sm text-[#A6A6A0]"
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onChange(item)}
                        aria-current={item === page ? 'page' : undefined}
                        className={`${baseBtn} ${item === page
                                ? 'border-[#14161A] bg-[#14161A] text-white'
                                : 'border-[#E6E5E0] bg-white text-[#14161A] hover:border-[#D6D5CF]'
                            }`}
                    >
                        {item}
                    </button>
                ),
            )}

            <button
                type="button"
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
                className={`${baseBtn} border-[#E6E5E0] bg-white text-[#14161A] hover:enabled:border-[#D6D5CF]`}
            >
                ›
            </button>
        </nav>
    )
}

export default Pagination
