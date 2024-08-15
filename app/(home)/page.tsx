import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="">
      <div className="sm:my-10 my-6 text-center space-y-2 sm:space-y-5">
        <h1 className="text-2xl sm:text-4xl font-bold text-off_white sm:pr-0 pr-1">Discover and Track Your Favorite Movies with
          <br className="sm:hidden block" />
          <span className="sm:pr-0 pl-2 text-red_power">
          My Awesome Movies
          </span>
        </h1>
      </div>
      <Hero />
    </div>
  )
}