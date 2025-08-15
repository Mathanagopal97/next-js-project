"use client";
import FieldInfo from "@/components/FieldInfo";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { Button, Flex, Input, Typography } from "antd";
import { useRouter } from "next/navigation";

export default function Login() {
  const { Title } = Typography;
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
      const { email, password } = value;
      try {
        const { data, error } = await authClient.signIn.email(
          {
            email,
            password,
            callbackURL: "/dashboard",
            rememberMe: false,
          },
          {
            onRequest: (ctx) => {
              //show loading
            },
            onSuccess: (ctx) => {
              //redirect to the dashboard or sign in page
            },
            onError: (ctx) => {
              // display the error message
              alert(ctx.error.message);
            },
          }
        );
      } catch (err: any) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <Title level={3}>Login</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Flex gap={10} vertical>
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
                return value.includes("error") && 'No "error" allowed in email';
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
                  {/* <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                /> */}
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
              htmlType="submit"
            >
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </>
  );
}
