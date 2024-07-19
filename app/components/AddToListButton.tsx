"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { LogIn, Plus, User } from "lucide-react";
import Link from 'next/link';

export default function UserNav() {
    const { data: session } = useSession();

    if (session) {
        return (
            <Button variant="destructive" className="gap-2 text-off_white bg-red_power">Add to Watchlist <Plus />  </Button>
        );
    } else {
        return (
            <Link href="/login">
                <Button  variant="destructive" className="gap-2 text-off_white bg-red_power">
                    Login <LogIn />
                </Button>
            </Link>
        );
    }

}