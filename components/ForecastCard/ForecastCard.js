const ForecastCard = ({ images, maxTemp, minTemp, tempState, tempDate }) => {
  const printTomorrow = function (tempDate) {
    let today = new Date();
    let date = new Date(tempDate);
    let options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    };

    if (date.getUTCDate() - today.getUTCDate() == 1) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", options);
    }
  };

  return (
    <div className="text-white bg-[#1E213A] flex flex-col items-center py-4 px-8">
      <h1 className="flex flex-shrink-0">{printTomorrow(tempDate)}</h1>
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
