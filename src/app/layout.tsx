import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import clsx from "clsx";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Delve | Supabase",
  description: "Delve into your supabase configs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-primary"
        )}
      >
        <Toaster />
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
