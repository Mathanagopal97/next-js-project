"use client";

// import bcrypt from "bcrypt";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { Button, Flex, Input, Splitter } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signUp, useSession } from "../../../lib/auth-client";

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
  const router = useRouter();

  useEffect(() => {
    fetch("api/login")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = useSession();

  console.log(session);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      const { email, password, name } = value;
      try {
        await signUp.email({ email, password, name });
        router.push("/dashboard"); // or wherever you want to redirect
      } catch (err: any) {
        console.log(err);
      }
    },
  });

  return (
    <Flex vertical gap="middle">
      <Splitter>
        <Splitter.Panel
          size={"50%"}
          style={{ margin: "20px" }}
          resizable={false}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <Flex gap={10} vertical style={{ marginBottom: "10px" }}>
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "A name is required"
                      : value.length < 3
                      ? "Name must be at least 3 characters"
                      : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <label htmlFor={field.name}>First Name:</label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </Flex>
            <Flex gap={10} vertical style={{ marginBottom: "10px" }}>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Email is required"
                      : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          value
                        )
                      ? undefined
                      : "Please enter a valid email",
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") && 'No "error" allowed in email'
                    );
                  },
                }}
                children={(field) => {
                  return (
                    <>
                      <label htmlFor={field.name}>Email:</label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </Flex>
            <Flex gap={10} vertical>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Password is required"
                      : value.length < 6
                      ? "Password must be at least 6 characters"
                      : undefined,
                }}
                children={(field) => {
                  return (
                    <>
                      <label htmlFor={field.name}>Password:</label>
                      <Input.Password
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      <FieldInfo field={field} />
                    </>
                  );
                }}
              />
            </Flex>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="primary"
                  disabled={!canSubmit}
                  style={{ marginTop: "10px" }}
                >
                  {isSubmitting ? "..." : "Submit"}
                </Button>
              )}
            />
          </form>
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
