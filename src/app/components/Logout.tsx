"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const signOutHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/sign-up");
        },
      },
    });
  };

  return <>{<Button onClick={() => signOutHandler()}>Logout</Button>}</>;
}
