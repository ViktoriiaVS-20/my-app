import React from "react";
import "./WeatherForecast.css";

export default function WeatherForecastDay(props) {
  let alt = props.data.condition.icon;
  let icon = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${alt}.png`;

  function maxTemperature() {
    let temperature = Math.round(props.data.temperature.maximum);
    return `${temperature}`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.temperature.minimum);
    return `${temperature}`;
  }

  function day() {
    let date = new Date(props.data.time * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  return (
    <div className="WeatherForecastDay">
      <div className="WeatherForecast-day">{day()}</div>
      <img src={icon} alt={alt} className="WeatherForecast-img" />
      <div className="WeatherForecastTemperature">
        <span className="WeatherForecastTemperature-max">
          {maxTemperature()}°
        </span>
        <span className="WeatherForecastTemperature-min">
          {minTemperature()}°
        </span>
      </div>
    </div>
  );
}
