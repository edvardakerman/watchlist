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
import { LogIn, User } from "lucide-react";
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";

export default function UserNav() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';


  if (loading) {
    return (
      <Skeleton className="h-10 w-10 flex justify-center text-center items-center bg-transparent">
          <User className="text-grey_muted w-7 h-7" />
      </Skeleton>

    );
  } else if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="relative h-10 w-10 p-0 rounded-sm">
            <User className="text-grey_muted hover:text-red_power w-7 h-7" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 bg-black" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-off_white">{session?.user?.name}</p>
              <p className="text-xs font-medium leading-none text-grey_muted">{session?.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs text-red_power" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else if (!loading) {
    return (
      <Link href="/sign-in">
        <Button variant="link" className="h-10 w-10 p-0 rounded-sm text-grey_muted hover:text-red_power relative z-50">
          <LogIn />
        </Button>
      </Link>
    );
  }

}