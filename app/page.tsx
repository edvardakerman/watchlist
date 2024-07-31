import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BackgroundImage from "@/public/login_background.jpg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={BackgroundImage}
        alt="background image"
        className="flex object-cover -z-10 brightness-50 "
        priority
        fill
      />
      <Header title='Welcome to My Awesome Movies' sub_title='Keep track of your favorite movies and explore new ones' />
      <Hero />
    </div>
  )
}