import Header from "./components/Header";
import Hero from "./components/Hero";

export default async function Home() {
  return (
    <div className="flex flex-col sm:items-center sm:justify-center">
      <Header title='Welcome to My Awesome Movies' sub_title='Keep track of your favorite movies and explore new ones' />
      <Hero/>
    </div>
  )
}