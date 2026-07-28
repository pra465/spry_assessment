type ErrorStateProps = {
    message: string
    onRetry: () => void
}

/** Shown when the product fetch fails. Lets the user retry the request. */
const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E6E5E0] bg-white/60 px-6 py-16 text-center">
            <p className="text-base font-semibold text-[#14161A]">
                Couldn&apos;t load products
            </p>
            <p className="mt-1.5 max-w-xs text-sm text-[#6E6E68]">{message}</p>
            <button
                type="button"
                onClick={onRetry}
                className="mt-5 rounded-lg bg-[#14161A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2A2D33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14161A] focus-visible:ring-offset-2"
            >
                Try again
            </button>
        </div>
    )
}

export default ErrorState
