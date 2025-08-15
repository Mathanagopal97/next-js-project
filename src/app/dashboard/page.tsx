import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <>You are not logged in</>;
  }
  return <>Dashboard page</>;
}
