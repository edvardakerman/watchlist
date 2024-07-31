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
          <MoviesProvider>
          <div className="flex flex-col h-[calc(100dvh)] justify-between">
            <Navbar />
            <main className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-20">
              {children}
            </main>
            <Footer />
          </div>
          </MoviesProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
