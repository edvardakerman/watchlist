import { Button } from "@/components/ui/button";
import { ArrowLeft, Frown } from "lucide-react";
import Link from "next/link";

interface OopsProps {
    message: string;
    btn_link: string;
    btn_text: string;
  }

export default function Oops({ message,  btn_link, btn_text }: OopsProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center mt-32 gap-4">
            <Frown className="text-off_white" size={56} />
            <p className="text-lg text-grey_muted">{message}</p>
            <Link href={btn_link}>
                <Button variant="destructive" className="mt-4 text-off_white bg-red_power gap-2"><ArrowLeft /> {btn_text}</Button>
            </Link>
        </div>
    )

}