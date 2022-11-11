import React from "react";
import FormattedDate from "./FormattedDate";

export default function Search(props) {
  if (props.data.country === "United States of America") {
    props.data.country = "USA";
  }

  return (
    <div>
      <div className="Weather-overview">
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
      <div className="Weather-data">
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
              <div className="col-md-6 row-6 mt-3 md-0">
                <div className="weather-temperature">
                  <strong>{Math.round(props.data.temperature)}</strong>
                  <span className="units">°C</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 mt-3">
            <ul>
              <li>Humidity: {props.data.humidity}%</li>
              <li>Wind: {props.data.wind} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
