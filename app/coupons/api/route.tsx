import { cookies } from "next/headers";

export async function POST(request: Request) {
    const coupon = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    const url = `${process.env.API_URL}/coupons/apply-coupon`;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const req = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(coupon),
    });

    const response = await req.json();

    return Response.json({ ...response, status: req.status });
}