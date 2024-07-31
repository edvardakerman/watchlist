import { Button } from "@/components/ui/button";
import { ArrowLeft, Frown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackgroundImage from "@/public/login_background.jpg";

interface OopsProps {
    message: string;
    btn_link: string;
    btn_text: string;
}

export default function Oops({ message, btn_link, btn_text }: OopsProps) {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Image
                src={BackgroundImage}
                alt="background image"
                className="flex object-cover -z-10 brightness-50"
                priority
                fill
            />
            <div className="flex flex-col items-center justify-center mt-32 bg-black/70 rounded p-10 space-y-2">
                <Frown className="text-off_white text-center" size={56} />
                <p className="text-lg text-grey_muted">{message}</p>
                <Link href={btn_link}>
                    <Button variant="destructive" className="mt-4 text-off_white bg-red_power gap-2"><ArrowLeft /> {btn_text}</Button>
                </Link>
            </div>


        </div>
    )

}