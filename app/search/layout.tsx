import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundImage from "@/public/login_background.jpg";

export default function SearchLayout({ children }: { children: ReactNode }) {
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
                <div className="w-full max-w-7xl  mx-auto overflow-x-hidden">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}