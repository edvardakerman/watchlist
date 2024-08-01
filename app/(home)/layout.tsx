import { ReactNode } from "react";
import Image from "next/image";
import BackgroundImage from "@/public/login_background.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex flex-col h-[calc(100dvh)] justify-between">
            <div className="absolute inset-0 -z-10">
                <Image
                    src={BackgroundImage}
                    alt="background image"
                    className="flex object-cover -z-10 brightness-50"
                    priority
                    fill
                />
            </div>
            <Navbar bg="bg-transparent" />
            <main className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-20">
                <div className="flex flex-col items-center justify-center bg-transparent">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
