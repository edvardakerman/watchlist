import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./components/NextAuthProvider";
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
          <MoviesProvider>
            {children}
          </MoviesProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
