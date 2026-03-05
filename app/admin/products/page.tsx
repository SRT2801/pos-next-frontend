import { serverApiFetch } from "@/services/serverApi";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Headings";
import Pagination from "@/components/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import { redirect } from "next/navigation";

async function getProducts(take: number, skip: number) {
    const json = await serverApiFetch(`/products?take=${take}&skip=${skip}`);
    const data = ProductsResponseSchema.parse(json);
    return {
        products: data.products,
        total: data.total
    }
}

type SearchParams = Promise<{ page: string }>

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {

    const page = await searchParams
    if (!isValidPage(+page.page)) redirect("/admin/products?page=1");

    const productsPerPage = 10;
    const skip = (+page.page - 1) * productsPerPage;

    const { products, total } = await getProducts(productsPerPage, skip);

    const totalPages = Math.ceil(total / productsPerPage);
    if (+page.page > totalPages) redirect(`/admin/products?page=1`);

    return (
        <>
            <Heading>Administración de productos</Heading>

            <ProductsTable products={products} />

            <Pagination
                page={+page.page}
                totalPages={totalPages}
                basePath="/admin/products"
            />
        </>
    )
}
