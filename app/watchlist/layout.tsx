import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Watchlist",
};

export default async function WatchlistLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/sign-in");
  } else {

    return (
        <div className="flex flex-col h-[calc(100dvh)] justify-between">
          <Navbar />
          <main className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-20">
            {children}
          </main>
          <Footer />
        </div>
    );
  }
}