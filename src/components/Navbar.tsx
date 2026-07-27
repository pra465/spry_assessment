import FavoritesCount from "./FavoritesCount"

const Navbar = () => {
    return (
        <header className="w-full border-b border-[#E6E5E0] bg-white">
            <div className="mx-auto flex h-[60px] w-full items-center justify-between px-4 sm:h-[72px] sm:px-10">
                <a href='/' className="text-[19px] font-bold tracking-[-0.03em] text-[#14161A] sm:text-[22px]">SHOP</a>
                <FavoritesCount count={0} />
            </div>
        </header>
    )
}

export default Navbar;