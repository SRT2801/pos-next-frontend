import { serverApiFetch } from "@/services/serverApi";
import { CategoryWithProductsResponseSchema } from "@/src/schemas";
import ProductCard from "@/components/products/ProductCard";
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
export default async function StorePage({ params }: { params: Params }) {

    const { categoryId } = await params;

    const category = await getProducts(categoryId);


    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {category.products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
