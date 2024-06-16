"use client";

import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";

type ProvidersProps = { children: React.ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return (
    <TRPCReactProvider>
      <SessionProvider>{children}</SessionProvider>
    </TRPCReactProvider>
  );
}
