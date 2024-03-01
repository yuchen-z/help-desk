import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/clientComponents/Navigation/Navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: 'Help Desk | %s',
    default: 'Help Desk',
  },
  description: "A help desk app for Zealthy customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <header className="list-none flex flex-row justify-end h-20 min-w-full bg-white shadow-sm">
          <Navigation/>
        </header>
        {children}
      </body>
    </html>
  );
}
