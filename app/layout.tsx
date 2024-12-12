import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/src/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Koraput Website",
  description: "Koraput Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
