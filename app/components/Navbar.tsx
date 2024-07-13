"use client";
// components/Navbar.tsx
import { useState } from 'react';
import Link from 'next/link';
import { SearchIcon, User } from 'lucide-react';
import UserNav from './UserNav';
import Dropdown from './DropDown';
import Image from "next/image";
import Logo from "../../public/netflix_logo.svg";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800">
            <div className="max-w-full mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="">
                            <Image src={Logo} alt="Watchlist logo" className='w-32' priority />
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
                        <div className="flex items-center space-x-4">
                            <SearchIcon className="w-6 h-6 text-gray-300 cursor-pointer" />
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
