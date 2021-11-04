const ForecastCard = ({ images, maxTemp, minTemp, tempState, tempDate }) => {
  const dayMonth = new Date(tempDate).getUTCDate();
  const year = new Date(tempDate).getUTCFullYear();
  const dayWeek = new Date(tempDate).getUTCDay();
  const month = new Date(tempDate).getUTCMonth();

  let date = new Date(Date.UTC(year, month, dayMonth, dayWeek, 0, 0));
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // console.log(date.toLocaleString("en-US", options));

  return (
    <div className="text-white bg-[#1E213A] flex flex-col items-center py-4 px-10">
      <h1 className="">{tempDate}</h1>
      <img
        className="w-20 py-5"
        src={`/assets/${images[tempState]}`}
        alt=""
      ></img>
      <div className="flex">
        <p className="mr-5">
          {maxTemp.toFixed()}
          <span>&#8451;</span>
        </p>
        <p className="text-[#A09FB1]">
          {minTemp.toFixed()}
          <span>&#8451;</span>
        </p>
      </div>
    </div>
  );
};

export default ForecastCard;
