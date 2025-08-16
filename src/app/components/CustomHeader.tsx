import { auth } from "@/lib/auth";
import { Header } from "antd/es/layout/layout";
import { headers } from "next/headers";
import Logout from "./Logout";

export default async function CustomHeader() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        justifyContent: "space-between",
      }}
    >
      {data ? data.user.id && <Logout /> : <></>}
    </Header>
  );
}
