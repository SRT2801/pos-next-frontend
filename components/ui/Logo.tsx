import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
      POS<span className="text-emerald-400">.next</span>
    </Link>
  )
}