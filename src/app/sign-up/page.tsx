"use client";

// import bcrypt from "bcrypt";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUp } from "../../../lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      //   const hashedPassword = await bcrypt.hash(password, 10);
      await signUp.email({ email, password, name });
      router.push("/dashboard"); // or wherever you want to redirect
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Sign Up</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
