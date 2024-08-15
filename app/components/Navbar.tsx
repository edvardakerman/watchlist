import Link from 'next/link';
import UserNav from './UserNav';
import Dropdown from './DropDown';
import Image from "next/image";
import Logo from "../../public/MAM-logo.png";
import SearchBar from './SearchBar';

interface NavProps {
  bg?: string;
}

export default function Navbar({ bg = "bg-black" }: NavProps) {
  return (
    <nav className={`${bg} fixed w-full top-0 z-40`}>
      <div className="max-w-full mx-auto pr-2 pl-5 md:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="block relative z-50">
                <Image
                  src={Logo}
                  alt="My Awesome Movies logo"
                  className="w-16 md:w-28"
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="absolute m-auto left-5 right-0">
            <div className="space-x-10 md:static md:flex md:items-center md:justify-center">
              <div className="hidden lg:block">
                <Link href="/" className="text-grey_muted hover:text-red_power px-5 py-2 rounded-md text-lg font-medium">
                  Home
                </Link>
                <Link href="/explore" className="text-grey_muted hover:text-red_power px-5 py-2 rounded-md text-lg font-medium">
                  Explore
                </Link>
                <Link href="/watchlist" className="text-grey_muted hover:text-red_power px-5 py-2 rounded-md text-lg font-medium">
                  Watchlist
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute right-0 flex items-center md:static md:inset-auto md:ml-6 md:pr-0">
            <div className="flex items-center space-x-2">
              <SearchBar />
              <div className="hidden lg:block">
                <UserNav />
              </div>
              <div className="inline-flex items-center justify-center p-2 lg:hidden">
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
