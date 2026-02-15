import { formatCurrency } from "@/src/utils";

type AmountProps = {
    label: string;
    amount: number;
    discount?: boolean;

}

export default function Amount({ label, amount, discount }: AmountProps) {
    return (
        <div className={`${discount && "line-through text-red-500"} flex justify-between`}>
            <dt className="font-bold">
                {label}
            </dt>

            <dd className="text-gray-900">
                {discount && <span className="line-through text-red-500">Discount: </span>}{formatCurrency(amount)}
            </dd>
        </div>
    )
}
