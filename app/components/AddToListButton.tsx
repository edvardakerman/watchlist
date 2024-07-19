"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { LogIn, Plus, User } from "lucide-react";
import Link from 'next/link';

export default function UserNav() {
    const { data: session } = useSession();

    if (session) {
        return (
            <Button className="gap-2">Add to Watchlist <Plus />  </Button>
        );
    } else {
        return (
            <Link href="/login">
                <Button className="gap-2">
                    Login <LogIn />
                </Button>
            </Link>
        );
    }

}