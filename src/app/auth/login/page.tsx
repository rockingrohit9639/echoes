"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="grid h-screen grid-cols-1 overflow-hidden md:grid-cols-2">
      <div className="border-border hidden border-r border-dashed md:block">
        <Image
          width={1000}
          height={900}
          className="h-full w-full object-cover grayscale transition-all duration-150 ease-in-out hover:grayscale-0"
          src="/login-bg.jpg"
          alt="echoes"
        />
      </div>
      <div className="relative p-8">
        <div className="absolute right-8 top-8 flex items-center">
          <div className="bg-primary mr-1 size-2.5" />
          <p className="text-sm">Echoes</p>
        </div>

        <div className="flex h-full flex-col justify-center">
          <h1 className="mb-1 text-2xl font-bold">Welcome to Echoes!</h1>
          <p className="text-muted-foreground mb-8 text-sm italic">
            Craft your own story. Every choice echoes through your adventure.
          </p>

          <button
            className="bg-border group flex w-max items-center gap-2 px-6 py-4"
            onClick={async () => {
              await signIn("google");
            }}
          >
            <Image
              width={20}
              height={20}
              src="/google.png"
              alt="google"
              className="grayscale transition-all duration-300 ease-in-out group-hover:grayscale-0"
            />

            <p>Login with google now</p>
          </button>
        </div>
      </div>
    </div>
  );
}
