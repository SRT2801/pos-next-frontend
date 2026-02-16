"use client"

import { useState } from "react";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";
import { getSalesByDate } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import TransactionSummary from "./TransactionsSummary";
import { formatCurrency } from "@/src/utils";


type valuePiece = Date | null
type value = valuePiece | [valuePiece, valuePiece]

export default function TransactionsFilter() {
    const [date, setDate] = useState<value>(new Date());

    const formattedDate = format(date?.toString()!, 'yyyy-MM-dd');
    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    const total = data?.reduce((total, transaction) => total + +transaction.total, 0) || 0;

    return (
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
            <div className="lg:sticky lg:top-10">
                <Calendar
                    value={date}
                    onChange={setDate}
                />
            </div>

            <div>
                {isLoading && <p className="text-lg text-center">Loading transactions...</p>}
                {data ? data.length ? data.map((transaction) => (
                    <TransactionSummary
                        key={transaction.id}
                        transaction={transaction}
                    />
                )) : <p className="text-lg text-center">No transactions found for this date.</p> : null}

                <p className="my-5 text-lg font-bold text-right" > total del dia: {''}
                    <span className="font-normal">
                         {formatCurrency(total)}
                    </span>

                </p>
            </div>

        </div>
    )
}
