import GithubSignInButton from "@/app/components/GithubSignInButton";
import GoogleSignInButton from "@/app/components/GoogleSignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In"
};

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center mt-24 rounded bg-black/80 py-10 px-6 sm:max-w-sm sm:px-14">
        <h1 className="text-4xl pb-10 font-bold text-off_white">Sign in</h1>
      <div className="flex flex-col gap-6">
        <GithubSignInButton />
        <GoogleSignInButton />
      </div>
      <div className="text-gray-500 text-sm mt-5">
        New User?{" "}
        <Link className="text-white hover:underline" href="/sign-up">
          Sign up now!
        </Link>
      </div>
    </div>
  );
}