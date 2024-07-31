"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import GooogleIcon from "../../public/google.svg";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn("google")} variant="outline" className="flex justify-between gap-5 bg-transparent text-grey_muted">
      Continue with Google 
      <Image src={GooogleIcon} alt="Google icon" className="w-6 h-6" />
    </Button>
  );
}