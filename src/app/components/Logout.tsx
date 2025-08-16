"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "antd";

export default function Logout() {
  const signOutHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/sign-up";
        },
      },
    });
  };

  return <>{<Button onClick={signOutHandler}>Logout</Button>}</>;
}
