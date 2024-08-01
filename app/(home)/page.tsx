import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="">
      <div className="sm:my-10 text-center space-y-2 sm:space-y-5">
        <h1 className="text-3xl sm:text-4xl font-bold text-off_white sm:pr-0 pr-1">Welcome to
          <br className="sm:hidden block" />
          <span className="sm:pr-0 pl-2">
            Fredagsmys!
          </span>
        </h1>
        <h2 className="text-xl text-grey_muted">Keep track of your favorite movies and explore new ones</h2>
      </div>
      <Hero />
    </div>
  )
}