import React, { useState } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function showForecast(respons) {
    setForecast(respons.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="row col-md p-0" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  } else {
    let key = `be08550c2aadfta34dbaac43c863o491`;
    let urlApi = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${key}&units=metric`;

    axios.get(urlApi).then(showForecast);

    return null;
  }
}
