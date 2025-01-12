import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Wagmi from "@/providers/wagmi";
import { Toaster } from "sonner";
import StateProvider from "@/providers/state-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pac-man",
  description: "Project by subhash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wagmi>
          <StateProvider>
            {children}
            <Toaster />
          </StateProvider>
        </Wagmi>
      </body>
    </html>
  );
}
