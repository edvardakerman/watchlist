import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from 'next';
import BackgroundImage from "@/public/login_background.jpg";

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
      <div className="relative flex flex-col min-h-screen overflow-hidden">
        {/* Fixed Background */}
        <div
          className="fixed inset-0 bg-cover bg-center brightness-50 z-[-1]"
          style={{
            backgroundImage: `url(${BackgroundImage.src})`,
          }}
        />

        {/* Navbar */}
        <Navbar bg="bg-[#03070D]" />

        {/* Main Content Wrapper */}
        <main className="flex-grow w-full mx-auto px-5 sm:px-6 lg:px-8 mt-20">
          {/* Content Centered */}
          <div className="w-full max-w-[100vw] overflow-x-hidden">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}