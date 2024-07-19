"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { ChevronRight, LogIn, MenuIcon } from "lucide-react";
import Link from "next/link";

export default function Dropdown() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="relative h-10 w-10 p-0 rounded-sm text-grey_muted hover:text-red_power">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className=" bg-black z-50" align="end" forceMount>
        <div className="space-y-2">
          <DropdownMenuItem>
            <Link href="/" className="text-lg flex flex-row items-center text-grey_muted">
              Home <ChevronRight />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/explore" className="text-lg flex flex-row items-center text-grey_muted">
              Explore <ChevronRight />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/watchlist" className="text-lg flex flex-row items-center text-grey_muted">
              Watchlist <ChevronRight />
            </Link>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        {session ? (
          <>
            <DropdownMenuItem className="text-xs leading-none text-grey_muted" >{session?.user?.email}</DropdownMenuItem>
            <DropdownMenuItem className="text-xs leading-none text-red_power" onClick={() => signOut()}>Sign out</DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link href="/login" className="flex flex-row gap-2 items-center text-red_power">
              Login <LogIn size={20} className="" />
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}