"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/netflix_logo.svg";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import UserNav from "./UserNav";

interface linkProps {
  name: string;
  href: string;
}

type Props = {
  /** color to use for the background */
  userEmail?: string | null;
}

const links: linkProps[] = [
  { name: "Home", href: "/home" },
  { name: "Explore", href: "/home/explore" },
  { name: "My List", href: "/home/my-list" },
];

export default function Navbar(props: Props) {
  const pathName = usePathname();
  return (
    <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link href="/home" className="w-32">
          <Image src={Logo} alt="Watchlist logo" priority />
        </Link>
        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathName === link.href ? (
                <li>
                  <Link
                    href={link.href}
                    className="text-white font-semibold underline text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-gray-300 font-normal text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-8">
        <Search className="w-5 h-5 text-gray-300 cursor-pointer" />
        <UserNav userEmail = {props.userEmail} />
      </div>
    </div>
  );
}