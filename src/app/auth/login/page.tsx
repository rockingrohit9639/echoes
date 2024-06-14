"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <button
        onClick={async () => {
          await signIn("google");
        }}
      >
        Login with google
      </button>
    </div>
  );
}
