"use client"

import { Product } from "@/src/schemas"
import { formatCurrency, getImagePath, isAvalilable } from "@/src/utils"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import DeleteProductForm from "./DeleteProductForm"

export default function ProductsTable({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("")

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return products

    return products.filter((product) => {
      return product.name.toLowerCase().includes(query)
    })
  }, [products, search])

  const imageBodyTemplate = (product: Product) => {
    return (
      <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
        <Image
          src={getImagePath(product.image)}
          width={48}
          height={48}
          alt={`imagen del producto ${product.name}`}
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  const priceBodyTemplate = (product: Product) => {
    return formatCurrency(product.price)
  }

  const inventoryBodyTemplate = (product: Product) => {
    return isAvalilable(product.inventory) ? (
      <span className="text-slate-600">{product.inventory}</span>
    ) : (
      <span className="text-red-600 font-medium">0</span>
    )
  }

  const statusBodyTemplate = (product: Product) => {
    if (product.inventory <= 0) {
      return (
        <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          Sin stock
        </span>
      )
    }

    if (product.inventory <= 5) {
      return (
        <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          Stock bajo
        </span>
      )
    }

    return (
      <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
        Disponible
      </span>
    )
  }

  const actionsBodyTemplate = (product: Product) => {
    return (
      <div className="flex items-center justify-end gap-2">
        <Link
          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
          href={`/admin/products/${product.id}/edit`}
          title="Editar"
          aria-label={`Editar ${product.name}`}
        >
          <i className="pi pi-pencil text-sm" />
          <span className="sr-only">, {product.name}</span>
        </Link>
        <DeleteProductForm
          productId={product.id}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <i className="pi pi-trash text-sm" />
        </DeleteProductForm>
      </div>
    )
  }

  const header = (
    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h2 className="text-xl font-bold text-slate-800">Lista de Productos</h2>
      <div className="relative w-full sm:w-72">
        <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar productos..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-transparent rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  )

  const footer = (
    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
      <span className="text-sm text-slate-500">
        Mostrando <span className="font-medium text-slate-700">1 a {filteredProducts.length}</span> de{" "}
        <span className="font-medium text-slate-700">{products.length}</span> productos
      </span>
    </div>
  )

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <DataTable
        value={filteredProducts}
        header={header}
        footer={footer}
        className="
          [&_.p-datatable-header]:bg-transparent!
          [&_.p-datatable-header]:border-0!
          [&_.p-datatable-header]:p-0!
          [&_.p-datatable-footer]:bg-transparent!
          [&_.p-datatable-footer]:border-0!
          [&_.p-datatable-footer]:p-0!
          [&_.p-datatable-thead>tr>th]:bg-slate-50!
          [&_.p-datatable-thead>tr>th]:text-slate-500!
          [&_.p-datatable-thead>tr>th]:uppercase!
          [&_.p-datatable-thead>tr>th]:text-xs!
          [&_.p-datatable-thead>tr>th]:font-semibold!
          [&_.p-datatable-thead>tr>th]:tracking-wider!
          [&_.p-datatable-thead>tr>th]:px-6!
          [&_.p-datatable-thead>tr>th]:py-4!
          [&_.p-datatable-tbody>tr]:transition-colors
          [&_.p-datatable-tbody>tr:hover]:bg-slate-50/70!
          [&_.p-datatable-tbody>tr>td]:px-6!
          [&_.p-datatable-tbody>tr>td]:py-4!
          [&_.p-datatable-tbody>tr>td]:border-slate-100!
        "
        tableStyle={{ width: "100%" }}
        emptyMessage="No hay productos disponibles"
      >
        <Column
          field="name"
          header="Producto"
          sortable
          bodyClassName="font-medium text-slate-700"
        />
        <Column
          header="Imagen"
          body={imageBodyTemplate}
          headerClassName="!text-left"
        />
        <Column
          field="price"
          header="Precio"
          body={priceBodyTemplate}
          sortable
          bodyClassName="text-center font-semibold text-slate-700"
          headerClassName="!text-center"
        />
        <Column
          field="inventory"
          header="Inventario"
          body={inventoryBodyTemplate}
          sortable
          bodyClassName="text-center"
          headerClassName="!text-center"
        />
        <Column
          header="Estado"
          body={statusBodyTemplate}
          bodyClassName="text-center"
          headerClassName="!text-center"
        />
        <Column
          header="Acciones"
          body={actionsBodyTemplate}
          bodyClassName="text-right"
          headerClassName="!text-right"
        />
      </DataTable>
    </div>
  )
}