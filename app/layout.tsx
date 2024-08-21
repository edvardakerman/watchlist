import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./components/NextAuthProvider";
import { MoviesProvider } from "./context/MovieContext";
import { WatchListProvider } from "./context/WatchListContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: {
    default: "My Awesome Movies",
    template: "%s | MAM",
  },
  description: "The best way to discover and keep track of your favorite movies",
  openGraph: {
    title: 'My Awesome Movies',
    description: 'The best way to discover and keep track of your favorite movies',
    images: '/opengraph-image.png'
  },
  twitter: {
    card: 'summary_large_image',
    site: 'MAM',
    title: 'My Awesome Movies',
    description: 'The best way to discover and keep track of your favorite movies',
    images: '/opengraph-image.png'
  }
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
            <WatchListProvider>
            {children}
            </WatchListProvider>
          </MoviesProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
