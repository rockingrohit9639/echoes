"use client";

import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "../ui/toaster";
import { ThemeProvider } from "./theme-provider";
import ModeToggle from "~/app/(authenticated)/_components/theme-toggler";

type ProvidersProps = { children: React.ReactNode };

export default function Providers({ children }: ProvidersProps) {
  return (
    <TRPCReactProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </SessionProvider>
    </TRPCReactProvider>
  );
}
