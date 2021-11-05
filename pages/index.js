import Head from "next/head";
import ForecastCard from "../components/ForecastCard/ForecastCard";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { GoLocation } from "react-icons/go";

export const getServerSideProps = async () => {
  const res = await fetch("https://www.metaweather.com/api/location/2450022/");
  const data = await res.json();
  return {
    props: {
      weather: data,
    },
  };
};

const images = {
  Sleet: "/Sleet.png",
  Snow: "/Snow.png",
  Hail: "/Hail.png",
  Thunderstorm: "/Thunderstorm.png",
  "Heavy Rain": "/HeavyRain.png",
  "Light Rain": "/LightRain.png",
  Showers: "/Showers.png",
  "Heavy Cloud": "/HeavyCloud.png",
  "Light Cloud": "/LightCloud.png",
  Clear: "/Clear.png",
};

const directionIcon = {
  N: "wi:wind-direction-n",
  NE: "wi:wind-direction-ne",
  NW: "wi:wind-direction-nw",
  S: "wi:wind-direction-s",
  SE: "wi:wind-direction-se",
  SW: "wi:wind-direction-sw",
  E: "wi:wind-direction-e",
  W: "wi:wind-direction-w",
};

export default function Home({ weather }) {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const forecast = weather.consolidated_weather.slice();
  const currentWeather = forecast.shift();
  const date = new Date().toDateString().split(" ").splice(0, 3).join(" ");

  return (
    <div className="min-h-screen bg-[#1E213A]">
      <Head>
        <title>Weather</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://code.iconify.design/2/2.0.3/iconify.min.js"></script>
      </Head>

      <main className="flex flex-col">
        {/* // Left / Top side of the page */}

        {/* sidebar */}
        <div
          className={
            sidebar
              ? "bg-[#1E213A] fixed inset-y-0 left-0 w-full z-50 duration-300 transition-right"
              : "hidden opacity-0"
          }
        >
          <div className="flex justify-end px-7 py-4">
            <button
              className="text-white transition hover:text-red-400 cursor-pointer"
              onClick={handleSidebar}
              type="submit"
            >
              X
            </button>
          </div>
          <div className="w-full flex justify-between px-7">
            <input
              className="w-64 border-2 border-white"
              type="text"
              placeholder="Search location"
            ></input>
            <button className="py-2 px-5 bg-[#3C47E9] text-white" type="submit">
              Search
            </button>
          </div>
          <div>{/* lista */}</div>
        </div>

        {/* Main */}

        <div className="relative flex flex-col min-h-screen items-center justify-between pb-32 pt-3">
          <div className="absolute h-full overflow-x-hidden">
            <img
              className="relative opacity-10 top-24 transform scale-[160%]"
              src="/assets/Cloud-background.png"
              alt="Cloud background"
            />
          </div>

          {/* Location buttons */}

          <div className="text-white flex justify-between w-full pt-2 px-4 z-40">
            <button
              className="bg-[#6E707A] py-1 px-4"
              onClick={handleSidebar}
              type="button"
            >
              Search for places
            </button>

            <button className="bg-[#6E707A] rounded-full" type="submit">
              <BiCurrentLocation />
            </button>
          </div>

          <div>
            <img
              className="w-25"
              src={`/assets/${images[currentWeather.weather_state_name]}`}
              alt="Current weather"
            />
          </div>

          <div className="text-white text-center">
            <h1 className="text-9xl">
              {currentWeather.the_temp.toFixed()}
              <span className="text-5xl">&#8451;</span>
            </h1>
            <p className="text-3xl pt-7">{currentWeather.weather_state_name}</p>
          </div>

          <div className="text-white text-center content-center grid grid-cols-2 gap-8">
            <p>Today</p>
            <p>{date}</p>
            <p className="col-span-2">
              <span className="inline-block">
                <GoLocation />
              </span>
              {"\u00A0"}
              {weather.title}
            </p>
          </div>
        </div>

        {
          // Right / bottom side of the page
        }

        <div className="bg-[#100E1D]">
          <div className="grid grid-cols-2 py-3 gap-5 px-10 pt-8 pb-12">
            {forecast.map(
              ({
                id,
                max_temp,
                min_temp,
                weather_state_name,
                applicable_date,
              }) => (
                <ForecastCard
                  key={id}
                  images={images}
                  maxTemp={max_temp}
                  minTemp={min_temp}
                  tempState={weather_state_name}
                  tempDate={applicable_date}
                />
              )
            )}
          </div>

          <h1 className="text-white text-xl px-5 pb-7">Today's Highlights</h1>

          <div className="grid grid-cols-1 gap-5 px-5 pb-5">
            <div className="text-white bg-[#1E213A] flex flex-col items-center py-6">
              <h1>Wind Status</h1>
              <p className="text-6xl py-5 font-bold">
                {currentWeather.wind_speed.toFixed()}
                <span className="text-3xl">mph</span>
              </p>
              <p className="pl-2">
                <span
                  className="iconify inline-block"
                  data-icon={`${
                    directionIcon[currentWeather.wind_direction_compass]
                  }`}
                ></span>
                {"\u00A0"}
                {currentWeather.wind_direction_compass}
              </p>
            </div>

            <div className="text-white bg-[#1E213A] flex flex-col items-center py-4 px-11">
              <h1>Humidity</h1>
              <p className="text-6xl py-5 font-bold">
                {currentWeather.humidity.toFixed()}
                <span className="text-3xl">%</span>
              </p>
              <ProgressBar completed={currentWeather.humidity.toFixed()} />
            </div>

            <div className="text-white bg-[#1E213A] flex flex-col items-center py-5">
              <h1>Visibility</h1>
              <p className="text-6xl py-5 font-bold">
                {currentWeather.visibility.toFixed(1)}
                <span className="text-3xl">miles</span>
              </p>
            </div>

            <div className="text-white bg-[#1E213A] flex flex-col items-center py-5">
              <h1>Air Pressure</h1>
              <p className="text-6xl py-5 font-bold">
                {currentWeather.air_pressure.toFixed()}
                <span className="text-3xl">mb</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className=""></footer>
    </div>
  );
}
