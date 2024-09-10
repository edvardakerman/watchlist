import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Oops from "./components/Oops";

export default function NotFound() {
    return (
            <div className="flex flex-col h-[calc(100dvh)] justify-between">
                <Navbar bg="bg-transparent"/>
                <main className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-20">
                    <Oops btn_link="/" btn_text="Home" message="Oops! Looks like this page doesn't exist." />
                </main>
                <Footer />
            </div>

    )
}