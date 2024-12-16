import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/Footer/Footer";
import Providers from "./components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Koraput Website",
  description: "Koraput Website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Navbar />
          <main className="pt-20 pb-20">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
