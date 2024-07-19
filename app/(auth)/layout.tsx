import { ReactNode } from "react";
import Image from "next/image";
import BackgroundImage from "@/public/login_background.jpg";


export default function AuthLayout({children}: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-black sm:items-center sm:justify-center sm:bg-transparent">
      <Image
        src={BackgroundImage}
        alt="background image"
        className="hidden sm:flex sm:object-cover -z-10 brightness-50"
        priority
        fill
      />
      {children}
    </div>
  );
}