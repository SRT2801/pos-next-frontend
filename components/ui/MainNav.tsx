import { serverApiFetch } from "@/services/serverApi";
import { CategoriesResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";
import AuthNavLinks from "./AuthNavLinks";

async function getCategories() {
    const json = await serverApiFetch("/categories");
    const categories = CategoriesResponseSchema.parse(json);
    return categories;
}

export default async function MainNav() {
    const categories = await getCategories()
    return (
        <nav className="bg-[#1e293b] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
            <div className="flex items-center space-x-8">
                <Logo />
                <div className="hidden md:flex space-x-6 text-sm font-semibold uppercase tracking-wider">
                    {categories.map(category => (
                        <Link
                            key={category.id}
                            href={`/${category.id}`}
                            className="hover:text-emerald-400 transition-colors">
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <AuthNavLinks />
            </div>
        </nav>
    )
}