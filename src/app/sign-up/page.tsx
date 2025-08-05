"use client";

// import bcrypt from "bcrypt";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Flex, Splitter } from "antd";
import SignUp from "../components/SignUp";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function SignUpPage() {
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
          Login
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
}
