"use client";

import { Button } from "@/components/ui/button";
import GithubIcon from "../../public/git.png";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Github } from "lucide-react";

export default function GithubSignInButton() {
  return (
    <Button onClick={() => signIn("github")} variant="outline" className="flex justify-between gap-5 bg-transparent text-grey_muted">
      Continue with Github
      <Github className="w-6 h-6"/>
    </Button>
  );
}