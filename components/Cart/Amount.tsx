import { formatCurrency } from "@/src/utils";

type AmountProps = {
    label: string;
    amount: number;
    discount?: boolean;
}

export default function Amount({ label, amount, discount }: AmountProps) {
    return (
        <div className="flex justify-between">
            <span className={`${discount ? 'text-red-500' : 'text-slate-500'}`}>
                {label}
            </span>
            <span className={`font-bold ${discount ? 'line-through text-red-500' : label === 'Total' ? 'text-3xl font-extrabold text-primary' : ''}`}>
                {formatCurrency(amount)}
            </span>
        </div>
    )
}
