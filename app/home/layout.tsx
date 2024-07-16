import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  } else {
    
    return (
      <div className="flex flex-col h-screen justify-between">
        <Navbar/>
        <main className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-20">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
}