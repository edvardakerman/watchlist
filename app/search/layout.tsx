import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MoviesProvider } from "../context/MovieContext";

export default function SearchLayout({ children }: { children: ReactNode }) {
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