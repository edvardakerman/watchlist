import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="mb-0">
      <div className="sm:my-10 text-center space-y-2 sm:space-y-5">
        <h1 className="text-2xl sm:text-4xl font-bold text-off_white sm:pr-0 pr-1">Discover and Track Your Favorite Movies with
          <br className="sm:hidden block" />
          <span className="sm:pr-0 pl-2 text-red_power">
            My Awesome Movies
          </span>
        </h1>
        <div className="justify-center flex">
          <p className="hidden sm:block px-8 font-light">My Awesome Movies, or <span className="text-red_power font-bold">MAM</span> for short is your go-to place for tracking the latest and hottest movies.</p>
        </div>
      </div>
      <Hero />
    </div>
  )
}