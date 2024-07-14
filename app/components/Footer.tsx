import Link from 'next/link';
import Image from "next/image";
import Logo from "../../public/netflix_logo.svg";

export default function Navbar() {

    return (
        <footer className='bg-transparent text-white p-5 lg:px-8'>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    <Link href="/home">
                        <Image src={Logo} alt="Watchlist logo" className='w-16 md:w-32' priority />
                    </Link>
                </div>
                <div className='flex space-x-6 md:space-x-10'>
                    <Link href="/home" className=" hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium">
                        Home
                    </Link>
                    <Link href="/home/explore" className=" hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium">
                        Explore
                    </Link>
                    <Link href="/home/my-list" className="hover:bg-gray-700 hover:text-white p-2 rounded-md text-sm font-medium">
                        My List
                    </Link>
                </div>
            </div>
            <div>
                <hr className=" border-white sm:mx-auto dark:border-gray-700 my-4" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Watchlist</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
}
