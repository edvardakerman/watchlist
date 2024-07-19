import Link from 'next/link';
import Image from "next/image";
import Logo from "../../public/netflix_logo.svg";

export default function Navbar() {

    return (
        <footer className='bg-black text-white p-5 lg:px-8'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <Link href="/">
                        <Image src={Logo} alt="Watchlist logo" className='w-16 md:w-32' priority />
                    </Link>
                </div>
                <div className='flex space-x-6 md:space-x-10'>
                <Link href="/" className="text-muted_text_color hover:text-link_color px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/explore" className="text-muted_text_color hover:text-link_color px-3 py-2 rounded-md text-sm font-medium">
                  Explore
                </Link>
                <Link href="/my-list" className="text-muted_text_color  hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">
                  My List
                </Link>
                </div>
            </div>
            <div>
                <hr className=" border-white sm:mx-auto dark:border-gray-700 my-4" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">Watchlist</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}
