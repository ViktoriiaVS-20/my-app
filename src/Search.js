import React from "react";
import FormattedDate from "./FormattedDate";

export default function Search(props) {
  function showFahrenheiht(event) {
    event.preventDefault();
    let fahrenheihtTemperature = Math.round(
      (props.data.temperature * 9) / 5 + 32
    );
    return fahrenheihtTemperature;
  }

  if (props.data.country === "United States of America") {
    props.data.country = "USA";
  }

  return (
    <div className="Weather">
      <div className="overview">
        <h1>
          {props.data.city} | {props.data.country}
        </h1>
        <ul>
          <li>
            <FormattedDate date={props.data.date} />
          </li>
          <li className="weather-desc">{props.data.description}</li>
        </ul>
      </div>
      <div className="row">
        <div className="col-6">
          <div className=" row weather-temperature">
            <div className="col-md-6 row-6">
              <img
                src={props.data.icon}
                alt={props.data.description}
                className="img"
              />
            </div>
            <div className="col-md-6 row-6 mt-3 mt-md-0">
              <strong>{Math.round(props.data.temperature)}</strong>
              <span className="units">
                <a href="/">°C</a> |
                <a href="/" onClick={showFahrenheiht}>
                  °F
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <ul>
            <li>Humidity: {props.data.humidity}%</li>
            <li>Wind: {props.data.wind} km/h</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
