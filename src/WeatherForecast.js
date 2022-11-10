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
    console.log(forecast);
    return (
      <div className="WeatherForecast">
        <div className="row">
          <div className="row col-md p-0">
            <WeatherForecastDay data={forecast[1]} />
          </div>
          <div className="row col-md p-0">
            <WeatherForecastDay data={forecast[2]} />
          </div>
          <div className="row col-md p-0">
            <WeatherForecastDay data={forecast[3]} />
          </div>
          <div className="row col-md p-o">
            <WeatherForecastDay data={forecast[4]} />
          </div>
          <div className="row col-md p-o">
            <WeatherForecastDay data={forecast[5]} />
          </div>
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
