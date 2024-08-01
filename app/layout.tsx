import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./components/NextAuthProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { MoviesProvider } from "./context/MovieContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Watchlist",
  description: "The best way to keep track of your favorite movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
            {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
