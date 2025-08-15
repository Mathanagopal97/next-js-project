import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  const response = await auth.api.signInEmail({
    body: { email, password },
    asResponse: true,
  });

  if (response.ok) {
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  }

  //   if (response.ok) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  return response;
}
