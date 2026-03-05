import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionDate = searchParams.get("transactionDate");
  console.log(transactionDate);

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`;
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const req = await fetch(url, { headers });
  const response = await req.json();

  return Response.json(response);
}
