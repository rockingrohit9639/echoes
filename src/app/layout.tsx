import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import Providers from "~/components/providers";

export const metadata = {
  title: "Echoes",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
