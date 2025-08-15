import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { auth } from "@/lib/auth";
import { Flex, Splitter } from "antd";
import { headers } from "next/headers";

export default async function SignUpPage() {
  // server side code.
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log(session);
  return (
    <Flex vertical gap="middle">
      <Splitter>
        <Splitter.Panel
          size={"50%"}
          style={{ margin: "20px" }}
          resizable={false}
        >
          <SignUp />
        </Splitter.Panel>
        <Splitter.Panel
          size={"50%"}
          style={{ margin: "20px" }}
          resizable={false}
        >
          <Login />
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
}
