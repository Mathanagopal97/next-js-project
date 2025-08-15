import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    const response = await auth.api.signUpEmail({
      body: { email, password, name },
      asResponse: true,
    });

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: data?.message || "Signup failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Signup successful" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error?.message },
      { status: 500 }
    );
  }
}
