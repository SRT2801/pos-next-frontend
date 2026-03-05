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
        <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
            <div className="flex justify-center">
                <Logo />
            </div>

            <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
                {categories.map(category => (
                    <Link
                        key={category.id}
                        href={`/${category.id}`}
                        className="text-white hover:text-green-400 font-bold p-2">
                        {category.name}
                    </Link>
                ))}

                <AuthNavLinks />
            </nav>
        </header>
    )
}