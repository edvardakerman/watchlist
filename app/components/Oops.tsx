import { Button } from "@/components/ui/button";
import { ArrowLeft, Frown } from "lucide-react";
import Link from "next/link";

export default function Oops() {
    return (
        <div className="flex flex-col items-center justify-center text-center mt-32 gap-4">
            <Frown className="text-off_white" size={56} />
            <p className="text-lg text-grey_muted">Oops! Looks like this movie doesn't exist.</p>
            <Link href="/explore">
                <Button variant="destructive" className="mt-4 text-off_white bg-red_power gap-2"><ArrowLeft /> Explore Movies</Button>
            </Link>
        </div>
    )

}