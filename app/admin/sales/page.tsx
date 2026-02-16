import TransactionsFilter from "@/components/transactions/TransactionsFilter";
import Headings from "@/components/ui/Headings";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { format } from "date-fns/format";
import { getSalesByDate } from "@/src/api";

export default async function SalesPage() {

  const queryClient = new QueryClient();
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');

  await queryClient.prefetchQuery({
    queryKey: ['sales', formattedDate],
    queryFn: () => getSalesByDate(formattedDate)
  })


  return (
    <>
      <Headings>Sales</Headings>
      <p className="text-lg">This is the Sales page.</p>

      <HydrationBoundary state={dehydrate(queryClient)}>

        <TransactionsFilter />

      </HydrationBoundary>

    </>
  )
}
