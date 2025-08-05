import { useForm } from "@tanstack/react-form";
import { Button, Flex, Input } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signUp, useSession } from "../../../lib/auth-client";
import FieldInfo from "./FieldInfo";

export default function SignUp() {
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
                : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                ? undefined
                : "Please enter a valid email",
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              /*TODO: Check if email exists*/
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
  );
}
