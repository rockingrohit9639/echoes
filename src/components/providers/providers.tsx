"use client";

import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "../ui/toaster";

type ProvidersProps = { children: React.ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </TRPCReactProvider>
  );
}
