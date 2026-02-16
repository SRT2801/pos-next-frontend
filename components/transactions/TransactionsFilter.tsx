"use client"

import { use, useState } from "react";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";
import { getSalesByDate } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import TransactionSummary from "./TransactionsSummary";

type valuePiece = Date | null
type value = valuePiece | [valuePiece, valuePiece]

export default function TransactionsFilter() {
    const [date, setDate] = useState<value>(new Date());

    const formattedDate = format(date?.toString()!, 'yyyy-MM-dd');
    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    return (
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
            <div>
                <Calendar
                    value={date}
                    onChange={setDate}
                />
            </div>

            <div>
                {isLoading && <p className="text-lg text-center">Loading transactions...</p>}
                { data?  data.length ? data.map((transaction) => (
                    <TransactionSummary
                        key={transaction.id}
                        transaction={transaction}
                    />
                )) : <p className="text-lg text-center">No transactions found for this date.</p> : null}
            </div>

        </div>
    )
}
