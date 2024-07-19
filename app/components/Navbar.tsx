
import Link from 'next/link';
import UserNav from './UserNav';
import Dropdown from './DropDown';
import Image from "next/image";
import Logo from "../../public/netflix_logo.svg";
import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <nav className="bg-black_background fixed w-full top-0 z-50">
      <div className="max-w-full mx-auto pr-2 pl-5 md:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="">
              <Image src={Logo} alt="Watchlist logo" className='w-16 md:w-32' priority />
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-center">
            <div className="hidden md:block">
              <div className="flex space-x-4">
                <Link href="/" className="text-grey_muted hover:text-red_power px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/explore" className="text-grey_muted hover:text-red_power px-3 py-2 rounded-md text-sm font-medium">
                  Explore
                </Link>
                <Link href="/watchlist" className="text-grey_muted hover:text-red_power px-3 py-2 rounded-md text-sm font-medium">
                  Watchlist
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:ml-6 md:pr-0">
            <div className="flex items-center space-x-2">
              <SearchBar />
              <div className="hidden md:block">
                <UserNav />
              </div>
              <div className="inline-flex items-center justify-center p-2 md:hidden">
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
