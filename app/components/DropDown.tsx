"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { MenuIcon, User } from "lucide-react";
import Link from "next/link";

export default function Dropdown() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 p-0 rounded-sm">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className=" bg-black" align="end" forceMount>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <DropdownMenuItem>
          <Link href="/home" className="">
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/home/explore" className="">
            Explore
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/home/my-list" className="">
            My List
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs leading-none text-muted-foreground" >{session?.user?.email}</DropdownMenuItem>
        <DropdownMenuItem className="text-xs leading-none text-muted-foreground" onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}