import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import BackgroundImage from "@/public/login_background.jpg";

export default function Home() {
  return (
    <div className="">
      <Header title='Welcome to My Awesome Movies' sub_title='Keep track of your favorite movies and explore new ones' />
      <Hero />
    </div>
  )
}