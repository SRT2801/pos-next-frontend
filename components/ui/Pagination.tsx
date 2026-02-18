import Link from "next/link";

type PaginationProps = {
    page: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ page, totalPages, basePath }: PaginationProps) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center py-10">
            {page > 1 && (
                <Link href={`${basePath}?page=${page - 1}`} className="mx-1 px-3 py-1 rounded-md bg-gray-200 text-gray-700">&laquo;</Link>
            )}

            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    href={`${basePath}?page=${currentPage}`}
                    className={`mx-1 px-3 py-1 rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >{currentPage}</Link>
            ))}

            {page < totalPages && (
                <Link href={`${basePath}?page=${page + 1}`} className="mx-1 px-3 py-1 rounded-md bg-gray-200 text-gray-700">&raquo;</Link>
            )}


        </nav>
    )
}
