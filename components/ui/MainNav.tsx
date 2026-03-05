import Logo from "./Logo";
import AuthNavLinks from "./AuthNavLinks";

export default async function MainNav() {
    return (
        <nav className="bg-[#1e293b] text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
            <div className="flex items-center space-x-8">
                <Logo />
            </div>

            <div className="flex items-center space-x-3 sm:space-x-6">
                <AuthNavLinks />
            </div>
        </nav>
    )
}