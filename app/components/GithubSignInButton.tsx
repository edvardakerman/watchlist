"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export default function GithubSignInButton() {
  return (
    <Button onClick={() => signIn("github")} variant="outline" className="flex justify-between gap-5 bg-transparent text-grey_muted">
      Continue with Github
      <Github className="w-6 h-6"/>
    </Button>
  );
}