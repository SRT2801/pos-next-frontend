import Link from "next/link"
import { z } from "zod"
import { CategoriesResponseSchema } from "@/src/schemas"

type Category = z.infer<typeof CategoriesResponseSchema>[number]

export default function CategoryFilter({
    categories,
    currentCategoryId,
}: {
    categories: Category[]
    currentCategoryId: string
}) {
    return (
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
            {categories.map((cat) => {
                const isActive = String(cat.id) === currentCategoryId
                return (
                    <Link
                        key={cat.id}
                        href={`/${cat.id}`}
                        className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${isActive
                            ? "bg-primary text-white shadow-md"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        {cat.name}
                    </Link>
                )
            })}
        </div>
    )
}
