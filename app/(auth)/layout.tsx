import { ReactNode } from "react";
import Image from "next/image";
import BackgroundImage from "@/public/login_background.jpg";


export default function AuthLayout({children}: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent">
      <Image
        src={BackgroundImage}
        alt="background image"
        className="flex object-cover -z-10 brightness-50"
        priority
        fill
      />
      {children}
    </div>
  );
}