import { serverApiFetch } from "@/services/serverApi";
import { CategoriesResponseSchema, CategoryWithProductsResponseSchema } from "@/src/schemas";
import ProductCard from "@/components/products/ProductCard";
import HeroBanner from "@/components/ui/HeroBanner";
import CategoryFilter from "@/components/ui/CategoryFilter";
import { redirect } from "next/navigation";

type Params = Promise<{ categoryId: string }>

async function getProducts(categoryId: string) {
    try {
        const json = await serverApiFetch(`/categories/${categoryId}?products=true`);
        const products = CategoryWithProductsResponseSchema.parse(json);
        return products;
    } catch {
        redirect('/1');
    }
}

async function getCategories() {
    const json = await serverApiFetch("/categories");
    return CategoriesResponseSchema.parse(json);
}

export default async function StorePage({ params }: { params: Params }) {

    const { categoryId } = await params;

    const [category, categories] = await Promise.all([
        getProducts(categoryId),
        getCategories(),
    ]);

    return (
        <>
            <HeroBanner />
            <CategoryFilter categories={categories} currentCategoryId={categoryId} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}
