import Head from "next/head";
import ForecastCard from "../components/ForecastCard/ForecastCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E213A]">
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col">
        {
          // Left / Top side of the page
        }

        <div className="relative flex flex-col min-h-screen items-center justify-between pb-32 pt-3">
          <div className="absolute top-44 overflow-hidden w-6/6">
            <img
              className="opacity-10 min-w-full"
              src="/assets/Cloud-background.png"
              alt="Cloud background"
            />
          </div>

          <div className="text-white">
            <button type="button">Search for places</button>
            <button type="button">Loc</button>
          </div>

          <div className="">
            <img
              className="w-25"
              src="/assets/Shower.png"
              alt="Current weather"
            />
          </div>

          <div className="text-white text-center">
            <h1 className="text-8xl">
              15<span className="text-5xl">&#8451;</span>
            </h1>
            <p className="text-3xl pt-7">Shower</p>
          </div>

          <div className="text-white text-center grid grid-cols-2 gap-4">
            <p>Today</p>
            <p>Fri, 5 Jun</p>
            <p className="col-span-2">Helsinki</p>
          </div>
        </div>

        {
          // Right / bottom side of the page
        }

        <div>
          <div className="grid grid-cols-2">
            <ForecastCard />
            <ForecastCard />
          </div>
        </div>
      </main>

      <footer className=""></footer>
    </div>
  );
}
