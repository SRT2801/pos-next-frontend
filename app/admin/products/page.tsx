import { serverApiFetch } from "@/services/serverApi";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Headings";
import { ProductsResponseSchema } from "@/src/schemas";

async function getProducts() {
    const json = await serverApiFetch(`/products`);
    const data = ProductsResponseSchema.parse(json);
    return data.products;
}

export default async function ProductsPage() {

    const products = await getProducts();

    return (
        <>
            <Heading>Administración de productos</Heading>

            <ProductsTable products={products} />
        </>
    )
}
