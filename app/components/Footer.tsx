import Link from 'next/link';
import Image from "next/image";
import Logo from "../../public/MAM-logo.png";

export default function Footer() {

    return (
        <footer className='bg-transparent text-white p-5 lg:px-8'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <Link href="/">
                        <Image src={Logo} alt="Watchlist logo" className='w-16' priority />
                    </Link>
                </div>
                <div className='flex space-x-2 md:space-x-10'>
                <Link href="/" className="text-grey_muted hover:text-red_power px-3 py-2 rounded-md text-xs font-medium">
                  Home
                </Link>
                <Link href="/explore" className="text-grey_muted hover:text-red_power px-3 py-2 rounded-md text-xs font-medium">
                  Explore
                </Link>
                <Link href="/watchlist" className="text-grey_muted hover:text-red_power px-3 py-2 rounded-md text-xs font-medium">
                  Watchlist
                </Link>
                </div>
            </div>
            <div>
                <hr className=" border-white sm:mx-auto dark:border-gray-700 my-4" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">MyAwesomeMovies.com</Link>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}
