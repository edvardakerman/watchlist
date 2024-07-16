
import Link from 'next/link';
import UserNav from './UserNav';
import Dropdown from './DropDown';
import Image from "next/image";
import Logo from "../../public/netflix_logo.svg";
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav className="bg-black fixed w-full top-0 z-50">
      <div className="max-w-full mx-auto pr-2 pl-5 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="">
              <Image src={Logo} alt="Watchlist logo" className='w-16 sm:w-32' priority />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/home/explore" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Explore
                </Link>
                <Link href="/home/my-list" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  My List
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex items-center space-x-2">
              <SearchBar />
              <div className="hidden sm:block">
                <UserNav />
              </div>
              <div className="inline-flex items-center justify-center p-2 sm:hidden">
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
